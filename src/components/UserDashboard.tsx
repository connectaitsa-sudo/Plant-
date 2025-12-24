import { useState } from 'react'
import { motion } from 'framer-motion'
import { Video, Camera, Bell, MapPin, Activity, Settings, BarChart3, AlertTriangle, CheckCircle, Wifi, WifiOff, Shield, Zap, Calendar, Download } from 'lucide-react'

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview')
  
  // Mock data - Replace with real API
  const user = {
    name: 'Muhammad Ahmed',
    plan: 'Professional',
    email: 'ahmed@farm.com',
    joinDate: '2024-01-15'
  }

  const devices = [
    { id: 1, name: 'Camera-North-Field', type: 'Jetson Nano', status: 'online', location: 'North Field', alerts: 3, lastSeen: '2 mins ago' },
    { id: 2, name: 'Drone-Fleet-01', type: 'Jetson Xavier', status: 'online', location: 'West Section', alerts: 0, lastSeen: '5 mins ago' },
    { id: 3, name: 'Camera-Greenhouse', type: 'Jetson Nano', status: 'offline', location: 'Greenhouse A', alerts: 0, lastSeen: '2 hours ago' }
  ]

  const recentAlerts = [
    { id: 1, disease: 'Powdery Mildew', severity: 'High', location: 'North Field, Sector 3', timestamp: '10 mins ago', status: 'new', gps: '31.5204°N, 74.3587°E' },
    { id: 2, disease: 'Leaf Spot', severity: 'Medium', location: 'West Section, Row 12', timestamp: '25 mins ago', status: 'acknowledged', gps: '31.5194°N, 74.3577°E' },
    { id: 3, disease: 'Root Rot', severity: 'High', location: 'Greenhouse A', timestamp: '1 hour ago', status: 'treated', gps: '31.5214°N, 74.3597°E' }
  ]

  const stats = [
    { label: 'Active Devices', value: '2/3', icon: Camera, color: 'from-blue-500 to-cyan-500', change: '+0%' },
    { label: 'Today\'s Alerts', value: '8', icon: Bell, color: 'from-red-500 to-orange-500', change: '+2' },
    { label: 'Area Monitored', value: '45 acres', icon: MapPin, color: 'from-green-500 to-emerald-500', change: '+5' },
    { label: 'Detection Rate', value: '99.5%', icon: Activity, color: 'from-purple-500 to-pink-500', change: '+0.3%' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-primary-950/20 to-black py-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Welcome back, {user.name}! 👋</h1>
              <p className="text-gray-400">Monitor your farm's health in real-time with AI-powered detection</p>
            </div>
            <div className="glass px-6 py-3 rounded-xl">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary-400" />
                <div>
                  <p className="text-xs text-gray-400">Current Plan</p>
                  <p className="text-white font-bold">{user.plan}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 overflow-x-auto">
            {['overview', 'devices', 'alerts', 'analytics', 'settings'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-xl font-semibold capitalize transition-all ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-primary-500 to-emerald-500 text-white'
                    : 'glass text-gray-400 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass p-6 rounded-2xl hover:bg-white/10 transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xs text-emerald-400 font-semibold">{stat.change}</span>
                  </div>
                  <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                  <p className="text-sm text-gray-400">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Recent Alerts */}
            <div className="glass p-6 rounded-2xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Bell className="w-6 h-6 text-primary-400" />
                  Recent Alerts
                </h2>
                <button className="text-primary-400 hover:text-primary-300 text-sm font-semibold">
                  View All →
                </button>
              </div>
              <div className="space-y-4">
                {recentAlerts.map((alert) => (
                  <div key={alert.id} className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      alert.severity === 'High' ? 'bg-red-500/20' : 
                      alert.severity === 'Medium' ? 'bg-yellow-500/20' : 'bg-green-500/20'
                    }`}>
                      <AlertTriangle className={`w-6 h-6 ${
                        alert.severity === 'High' ? 'text-red-400' : 
                        alert.severity === 'Medium' ? 'text-yellow-400' : 'text-green-400'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-white">{alert.disease}</h3>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                          alert.severity === 'High' ? 'bg-red-500 text-white' : 
                          alert.severity === 'Medium' ? 'bg-yellow-500 text-black' : 'bg-green-500 text-white'
                        }`}>
                          {alert.severity}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400 mb-1">{alert.location}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {alert.gps}
                        </span>
                        <span>{alert.timestamp}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg text-sm font-semibold transition-all">
                        View
                      </button>
                      <button className="px-4 py-2 glass hover:bg-white/20 text-white rounded-lg text-sm font-semibold transition-all">
                        Mark Treated
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Monitoring */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="glass p-6 rounded-2xl">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Video className="w-5 h-5 text-primary-400" />
                  Live Camera Feeds
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {devices.filter(d => d.status === 'online').map((device) => (
                    <div key={device.id} className="relative aspect-video bg-black rounded-lg overflow-hidden group cursor-pointer">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-primary-500/20 flex items-center justify-center">
                            <Camera className="w-6 h-6 text-primary-400" />
                          </div>
                          <p className="text-xs text-white font-semibold">{device.name}</p>
                          <p className="text-xs text-gray-400">{device.location}</p>
                        </div>
                      </div>
                      <div className="absolute top-2 right-2">
                        <span className="flex items-center gap-1 px-2 py-1 bg-green-500 rounded-full text-xs font-bold text-white">
                          <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></div>
                          LIVE
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-all flex items-end p-3">
                        <button className="w-full py-2 bg-primary-500 text-white rounded-lg text-xs font-semibold">
                          Open Stream
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass p-6 rounded-2xl">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary-400" />
                  Today's Activity
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Images Analyzed</span>
                    <span className="text-white font-bold">247</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-primary-500 to-emerald-500" style={{ width: '82%' }}></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Diseases Detected</span>
                    <span className="text-white font-bold">8</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-yellow-500 to-orange-500" style={{ width: '15%' }}></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Healthy Plants</span>
                    <span className="text-white font-bold">239</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500" style={{ width: '97%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Devices Tab */}
        {activeTab === 'devices' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">My Devices</h2>
              <button className="px-6 py-3 bg-gradient-to-r from-primary-500 to-emerald-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
                + Add Device
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {devices.map((device) => (
                <div key={device.id} className="glass p-6 rounded-2xl hover:bg-white/10 transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl ${
                      device.status === 'online' ? 'bg-green-500/20' : 'bg-gray-500/20'
                    } flex items-center justify-center`}>
                      <Camera className={`w-6 h-6 ${
                        device.status === 'online' ? 'text-green-400' : 'text-gray-400'
                      }`} />
                    </div>
                    {device.status === 'online' ? (
                      <Wifi className="w-5 h-5 text-green-400" />
                    ) : (
                      <WifiOff className="w-5 h-5 text-gray-500" />
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{device.name}</h3>
                  <p className="text-sm text-gray-400 mb-3">{device.type}</p>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <MapPin className="w-4 h-4 text-primary-400" />
                      {device.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <Activity className="w-4 h-4 text-primary-400" />
                      Last seen: {device.lastSeen}
                    </div>
                    {device.alerts > 0 && (
                      <div className="flex items-center gap-2 text-sm text-red-400">
                        <Bell className="w-4 h-4" />
                        {device.alerts} active alerts
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg text-sm font-semibold transition-all">
                      View Stream
                    </button>
                    <button className="px-4 py-2 glass hover:bg-white/20 text-white rounded-lg text-sm transition-all">
                      <Settings className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-8 glass p-6 rounded-2xl">
          <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Download, label: 'Export Report', color: 'from-blue-500 to-cyan-500' },
              { icon: Calendar, label: 'Schedule Scan', color: 'from-green-500 to-emerald-500' },
              { icon: Settings, label: 'Device Settings', color: 'from-purple-500 to-pink-500' },
              { icon: Zap, label: 'API Access', color: 'from-yellow-500 to-orange-500' }
            ].map((action, i) => (
              <button
                key={i}
                className="flex flex-col items-center gap-3 p-4 glass hover:bg-white/10 rounded-xl transition-all group"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-semibold text-white">{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDashboard
