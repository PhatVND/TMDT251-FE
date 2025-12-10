import { Users, DollarSign, AlertCircle, TrendingUp, Shield, Flag } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const platformStats = {
  totalUsers: 12450,
  activeTrainers: 348,
  totalRevenue: 485620,
  pendingDisputes: 3
};

const recentUsers = [
  { id: 1, name: "Marcus Steel", type: "PT", joined: "Nov 12", status: "active", revenue: 12480 },
  { id: 2, name: "Sarah Power", type: "PT", joined: "Nov 10", status: "active", revenue: 9850 },
  { id: 3, name: "John Davis", type: "Customer", joined: "Nov 14", status: "active", spent: 320 },
  { id: 4, name: "FitGear Co", type: "Agent", joined: "Nov 8", status: "active", revenue: 18750 },
  { id: 5, name: "Jake Thunder", type: "PT", joined: "Nov 6", status: "active", revenue: 11200 }
];

const transactions = [
  { id: 1, from: "John D.", to: "Marcus Steel", amount: 80, type: "Session", status: "completed", date: "Nov 14" },
  { id: 2, from: "Sarah M.", to: "FitGear Co", amount: 299.99, type: "Product", status: "completed", date: "Nov 14" },
  { id: 3, from: "Mike R.", to: "Sarah Power", amount: 280, type: "Package", status: "pending", date: "Nov 14" },
  { id: 4, from: "Emma W.", to: "Jake Thunder", amount: 75, type: "Session", status: "completed", date: "Nov 13" },
  { id: 5, from: "Alex C.", to: "FitGear Co", amount: 49.99, type: "Product", status: "completed", date: "Nov 13" }
];

const disputes = [
  { id: 1, reporter: "John D.", against: "Marcus Steel", reason: "Session not delivered", status: "open", date: "Nov 13" },
  { id: 2, reporter: "Mike R.", against: "FitGear Co", reason: "Product quality issue", status: "investigating", date: "Nov 12" },
  { id: 3, reporter: "Emma W.", against: "Sarah Power", reason: "Schedule conflict", status: "resolved", date: "Nov 10" }
];

const growthData = [
  { month: "Jan", users: 8200, revenue: 285000 },
  { month: "Feb", users: 8800, revenue: 312000 },
  { month: "Mar", users: 9500, revenue: 348000 },
  { month: "Apr", users: 10200, revenue: 395000 },
  { month: "May", users: 11100, revenue: 432000 },
  { month: "Jun", users: 12450, revenue: 485620 }
];

export function DesktopAdminDashboard() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-primary/20 text-primary";
      case "pending": return "bg-yellow-500/20 text-yellow-600";
      case "completed": return "bg-primary/20 text-primary";
      case "open": return "bg-destructive/20 text-destructive";
      case "investigating": return "bg-yellow-500/20 text-yellow-600";
      case "resolved": return "bg-primary/20 text-primary";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-8 h-8 text-primary" />
            <h1 className="text-foreground">Admin Dashboard</h1>
          </div>
          <p className="text-muted-foreground">FitConnect Platform Overview</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <Card className="p-6 border-border bg-card">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <Badge className="bg-primary/20 text-primary border-0">
                <TrendingUp className="w-3 h-3 mr-1" />
                +24.5%
              </Badge>
            </div>
            <div className="text-muted-foreground text-sm mb-1">Total Users</div>
            <div className="text-foreground text-2xl">{platformStats.totalUsers.toLocaleString()}</div>
          </Card>

          <Card className="p-6 border-border bg-card">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary" />
              </div>
            </div>
            <div className="text-muted-foreground text-sm mb-1">Active Trainers</div>
            <div className="text-foreground text-2xl">{platformStats.activeTrainers}</div>
          </Card>

          <Card className="p-6 border-border bg-card">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-primary" />
              </div>
              <Badge className="bg-primary/20 text-primary border-0">
                <TrendingUp className="w-3 h-3 mr-1" />
                +18.2%
              </Badge>
            </div>
            <div className="text-muted-foreground text-sm mb-1">Total Revenue</div>
            <div className="text-foreground text-2xl">${platformStats.totalRevenue.toLocaleString()}</div>
          </Card>

          <Card className="p-6 border-border bg-card">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-destructive/10 rounded-xl flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-destructive" />
              </div>
            </div>
            <div className="text-muted-foreground text-sm mb-1">Pending Disputes</div>
            <div className="text-foreground text-2xl">{platformStats.pendingDisputes}</div>
          </Card>
        </div>

        {/* Growth Chart */}
        <Card className="p-6 border-border bg-card mb-8">
          <h2 className="text-foreground mb-6">Platform Growth</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={growthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
              <XAxis dataKey="month" stroke="#666666" />
              <YAxis yAxisId="left" stroke="#666666" />
              <YAxis yAxisId="right" orientation="right" stroke="#666666" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', borderRadius: '8px' }}
              />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="users" stroke="#FF6A00" strokeWidth={2} name="Users" />
              <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#0D0D0D" strokeWidth={2} name="Revenue ($)" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Content Tabs */}
        <Tabs defaultValue="users" className="w-full">
          <TabsList className="bg-card border border-border mb-6">
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="disputes">Disputes</TabsTrigger>
          </TabsList>

          {/* Users Tab */}
          <TabsContent value="users">
            <Card className="border-border bg-card">
              <div className="p-6 border-b border-border">
                <div className="flex items-center justify-between">
                  <h2 className="text-foreground">Recent Users</h2>
                  <Button size="sm" className="bg-primary text-white">Export Data</Button>
                </div>
              </div>
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead className="text-muted-foreground">Name</TableHead>
                    <TableHead className="text-muted-foreground">Type</TableHead>
                    <TableHead className="text-muted-foreground">Joined</TableHead>
                    <TableHead className="text-muted-foreground">Status</TableHead>
                    <TableHead className="text-muted-foreground text-right">Activity</TableHead>
                    <TableHead className="text-muted-foreground text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentUsers.map((user) => (
                    <TableRow key={user.id} className="border-border">
                      <TableCell className="text-foreground">{user.name}</TableCell>
                      <TableCell>
                        <Badge className="bg-primary/20 text-primary border-0">
                          {user.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{user.joined}</TableCell>
                      <TableCell>
                        <Badge className={`${getStatusColor(user.status)} border-0 capitalize`}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right text-foreground">
                        ${user.revenue || user.spent}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="ghost" className="text-primary">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          {/* Transactions Tab */}
          <TabsContent value="transactions">
            <Card className="border-border bg-card">
              <div className="p-6 border-b border-border">
                <div className="flex items-center justify-between">
                  <h2 className="text-foreground">Recent Transactions</h2>
                  <Button size="sm" className="bg-primary text-white">Export</Button>
                </div>
              </div>
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead className="text-muted-foreground">From</TableHead>
                    <TableHead className="text-muted-foreground">To</TableHead>
                    <TableHead className="text-muted-foreground">Type</TableHead>
                    <TableHead className="text-muted-foreground">Date</TableHead>
                    <TableHead className="text-muted-foreground">Status</TableHead>
                    <TableHead className="text-muted-foreground text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((tx) => (
                    <TableRow key={tx.id} className="border-border">
                      <TableCell className="text-foreground">{tx.from}</TableCell>
                      <TableCell className="text-foreground">{tx.to}</TableCell>
                      <TableCell className="text-muted-foreground">{tx.type}</TableCell>
                      <TableCell className="text-muted-foreground">{tx.date}</TableCell>
                      <TableCell>
                        <Badge className={`${getStatusColor(tx.status)} border-0 capitalize`}>
                          {tx.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right text-primary">${tx.amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          {/* Disputes Tab */}
          <TabsContent value="disputes">
            <Card className="border-border bg-card">
              <div className="p-6 border-b border-border">
                <div className="flex items-center justify-between">
                  <h2 className="text-foreground">Dispute Resolution</h2>
                  <Badge className="bg-destructive/20 text-destructive border-0">
                    {disputes.filter(d => d.status !== "resolved").length} Active
                  </Badge>
                </div>
              </div>
              <div className="p-6 space-y-4">
                {disputes.map((dispute) => (
                  <Card key={dispute.id} className="p-5 border-border bg-background">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-destructive/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Flag className="w-6 h-6 text-destructive" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-foreground mb-1">{dispute.reason}</h3>
                            <p className="text-muted-foreground text-sm">
                              {dispute.reporter} vs {dispute.against}
                            </p>
                          </div>
                          <Badge className={`${getStatusColor(dispute.status)} border-0 capitalize`}>
                            {dispute.status}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between pt-3 border-t border-border">
                          <p className="text-muted-foreground text-sm">Reported: {dispute.date}</p>
                          {dispute.status !== "resolved" && (
                            <Button size="sm" className="bg-primary text-white">
                              Review Case
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
