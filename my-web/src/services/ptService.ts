import axiosClient from './axiosClient';

// 1. Định nghĩa kiểu dữ liệu GỐC mà API trả về (nhìn vào cái JSON bạn gửi)
export interface UserAPI {
  id: number;
  role: string;
  phoneNumber: string;
  email: string;
  fullName: string;
  gender: string;
  specialty?: string;
  experienceYear?: number;
  certificate?: string;
  bio?: string;
  address?: string;
  // Các trường khác nếu cần thì thêm vào, hiện tại bao nhiêu đây là đủ hiển thị
}
export interface BookingAPI {
  id: number;
  date: string;
  status: string;
  totalAmount: number;
  trainee: any; // Thay traineeUser thành trainee
  trainer: UserAPI; // Thay trainerUser thành trainer
}
export interface CreateBookingRequest {
  traineeId: number;
  trainerId: number;
  date: string;
  totalAmount: number;
}
export interface ReviewAPI {
  id: number;
  reviewDate: string; // dạng "2025-12-22T..."
  comment: string;
  rating: number;
  user: UserAPI;      // Người viết review (Trainee)
  trainer: UserAPI;   // Người được review (Trainer)
}
// 2. Định nghĩa kiểu dữ liệu ĐẸP để dùng cho UI (Interface cũ)
export interface Trainer {
  id: number;
  name: string;
  specialization: string;
  avatar: string;
  rating: number;
  experience: number;
  bio?: string;
  certificate?: string;
}
export interface CreateReviewRequest {
  comment: string;
  rating: number;
  traineeId: number;
  trainerId: number;
}

const bookingService = {
  // Lấy danh sách booking (Của người đang đăng nhập - Giả sử là User ID 1)
  getMyBookings: async (currentUserId: number = 1): Promise<BookingAPI[]> => {
    try {
      const response = await axiosClient.get<BookingAPI[]>('/bookings');
      const allBookings = Array.isArray(response) ? response : (response as any).data || [];

      // Lọc booking của User hiện tại (Client-side filtering)
      return allBookings.filter((b: BookingAPI) => b.trainee?.id === currentUserId);
    } catch (error) {
      console.error("Lỗi lấy danh sách booking:", error);
      return [];
    }
  },

  // Tạo booking mới
  createBooking: async (data: CreateBookingRequest) => {
    return axiosClient.post('/bookings', data);
  }
};

const ptService = {
  getAllTrainers: async (): Promise<Trainer[]> => {
    // Gọi endpoint /users (lấy cục lẩu thập cẩm về)
    const response = await axiosClient.get<UserAPI[]>('/users');
    
    // Kiểm tra an toàn dữ liệu
    const allUsers = Array.isArray(response) ? response : (response as any).data || [];

    // --- BƯỚC QUAN TRỌNG NHẤT: LỌC VÀ CHẾ BIẾN DỮ LIỆU ---
    
    // 1. Lọc: Chỉ lấy ông nào có role là TRAINER
    const onlyTrainers = allUsers.filter((user: UserAPI) => user.role === 'TRAINER');

    // 2. Map: Biến đổi dữ liệu API thành dữ liệu UI
    const cleanData = onlyTrainers.map((t: UserAPI) => ({
      id: t.id,
      name: t.fullName || "Huấn luyện viên", // Map fullName -> name
      specialization: t.specialty || "General Fitness", // Nếu null thì điền mặc định
      experience: t.experienceYear || 1, // Map experienceYear -> experience
      
      // --- TỰ CHẾ DỮ LIỆU THIẾU (Fake data) ---
      // Tạo ảnh avatar dựa trên tên (dùng dịch vụ ui-avatars.com miễn phí)
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(t.fullName || "PT")}&background=random&size=200`,
      
      // Random điểm đánh giá từ 4.5 đến 5.0 cho đẹp đội hình
      rating: parseFloat((4.5 + Math.random() * 0.5).toFixed(1))
    }));

    return cleanData;
  },
getTrainerById: async (id: number): Promise<Trainer | null> => {
    try {
      const response = await axiosClient.get<UserAPI>(`/users/${id}`);
      const data = (response as any).data || response;

      // Map dữ liệu THẬT từ API
      return {
        id: data.id,
        name: data.fullName || "Huấn luyện viên",
        specialization: data.specialty || "General Fitness",
        experience: data.experienceYear || 1, // Lấy số năm KN thật
        bio: data.bio || `Huấn luyện viên chuyên nghiệp với chuyên môn ${data.specialty || "thể hình"}.`, // Lấy Bio thật
        certificate: data.certificate || "Certified Personal Trainer", // Lấy bằng cấp thật
        
        // Mấy cái này Backend chưa có thì vẫn phải Fake, nhưng sẽ xử lý ở UI cho đẹp
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.fullName || "PT")}&background=random&size=200`,
        rating: 0, // Để 0, ra ngoài UI mình sẽ random dựa theo ID
      };
    } catch (error) {
      console.error("Lỗi lấy chi tiết PT:", error);
      return null;
    }
  },
  getReviewsByTrainerId: async (trainerId: number): Promise<ReviewAPI[]> => {
    try {
      // Gọi API lấy toàn bộ reviews
      const response = await axiosClient.get<ReviewAPI[]>('/reviews');
      const allReviews = Array.isArray(response) ? response : (response as any).data || [];

      // LỌC: Chỉ lấy review nào mà trainer.id trùng với trainerId đang xem
      const filteredReviews = allReviews.filter((r: ReviewAPI) => r.trainer?.id === trainerId);
      
      return filteredReviews;
    } catch (error) {
      console.error("Lỗi lấy reviews:", error);
      return [];
    }
  },
createBooking: async (data: any) => {
        return axiosClient.post('/bookings', data);
    },
getMyBookings: async (): Promise<BookingAPI[]> => {
    try {
      const response = await axiosClient.get<BookingAPI[]>('/bookings');
      // Trả về trực tiếp mảng dữ liệu từ API
      return Array.isArray(response) ? response : (response as any).data || [];
    } catch (error) {
      console.error("Lỗi gọi API /bookings:", error);
      return [];
    }
  },
  createReview: async (data: CreateReviewRequest) => {
    return axiosClient.post('/reviews', data);
  },getAllReviews: async (): Promise<ReviewAPI[]> => {
    try {
      const response = await axiosClient.get<ReviewAPI[]>('/reviews');
      return Array.isArray(response) ? response : (response as any).data || [];
    } catch (error) {
      console.error("Lỗi lấy danh sách review:", error);
      return [];
    }
  },





};

export default ptService; bookingService;