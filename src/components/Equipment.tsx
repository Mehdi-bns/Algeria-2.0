import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Tractor, Wrench, Calendar, AlertTriangle, CheckCircle, Clock } from 'lucide-react'
import { ImageWithFallback } from './figma/ImageWithFallback'

export function Equipment() {
  const equipment = [
    {
      id: 1,
      name: 'John Deere 7250R',
      type: 'Tractor',
      status: 'operational',
      lastMaintenance: '2024-07-15',
      nextMaintenance: '2024-09-15',
      hoursUsed: 245,
      location: 'Field A-12',
      image: 'https://images.unsplash.com/photo-1685474442734-bb453f03060d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtJTIwZXF1aXBtZW50JTIwdHJhY3RvcnxlbnwxfHx8fDE3NTU4Mzc3NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 2,
      name: 'Case IH Axial-Flow 250',
      type: 'Combine Harvester',
      status: 'maintenance',
      lastMaintenance: '2024-08-01',
      nextMaintenance: '2024-08-25',
      hoursUsed: 89,
      location: 'Maintenance Bay',
      image: 'https://images.unsplash.com/photo-1685474442734-bb453f03060d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtJTIwZXF1aXBtZW50JTIwdHJhY3RvcnxlbnwxfHx8fDE3NTU4Mzc3NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 3,
      name: 'Irrigation Sprinkler System',
      type: 'Irrigation',
      status: 'operational',
      lastMaintenance: '2024-06-20',
      nextMaintenance: '2024-09-20',
      hoursUsed: 1240,
      location: 'Field B-8',
      image: 'https://images.unsplash.com/photo-1685474442734-bb453f03060d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtJTIwZXF1aXBtZW50JTIwdHJhY3RvcnxlbnwxfHx8fDE3NTU4Mzc3NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 4,
      name: 'Kubota M7-172',
      type: 'Tractor',
      status: 'needs_attention',
      lastMaintenance: '2024-05-10',
      nextMaintenance: '2024-08-10',
      hoursUsed: 380,
      location: 'Field C-5',
      image: 'https://images.unsplash.com/photo-1685474442734-bb453f03060d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtJTIwZXF1aXBtZW50JTIwdHJhY3RvcnxlbnwxfHx8fDE3NTU4Mzc3NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    }
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'operational':
        return (
          <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
            <CheckCircle className="h-3 w-3" />
            Operational
          </Badge>
        )
      case 'maintenance':
        return (
          <Badge variant="secondary" className="flex items-center gap-1">
            <Wrench className="h-3 w-3" />
            In Maintenance
          </Badge>
        )
      case 'needs_attention':
        return (
          <Badge variant="destructive" className="flex items-center gap-1">
            <AlertTriangle className="h-3 w-3" />
            Needs Attention
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational':
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case 'maintenance':
        return <Clock className="h-5 w-5 text-yellow-600" />
      case 'needs_attention':
        return <AlertTriangle className="h-5 w-5 text-red-600" />
      default:
        return <Tractor className="h-5 w-5 text-gray-600" />
    }
  }

  const summaryStats = {
    total: equipment.length,
    operational: equipment.filter(e => e.status === 'operational').length,
    maintenance: equipment.filter(e => e.status === 'maintenance').length,
    needsAttention: equipment.filter(e => e.status === 'needs_attention').length
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Equipment Management</h1>
          <p className="text-muted-foreground">Monitor and maintain your farm equipment</p>
        </div>
        <Button className="flex items-center gap-2">
          <Tractor className="h-4 w-4" />
          Add Equipment
        </Button>
      </div>

      {/* Equipment Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Tractor className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Total Equipment</p>
                <p className="text-xl font-semibold">{summaryStats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Operational</p>
                <p className="text-xl font-semibold">{summaryStats.operational}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="text-sm text-muted-foreground">In Maintenance</p>
                <p className="text-xl font-semibold">{summaryStats.maintenance}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-sm text-muted-foreground">Needs Attention</p>
                <p className="text-xl font-semibold">{summaryStats.needsAttention}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Equipment List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {equipment.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {getStatusIcon(item.status)}
                    {item.name}
                  </CardTitle>
                  <CardDescription>{item.type}</CardDescription>
                </div>
                {getStatusBadge(item.status)}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ImageWithFallback
                src={item.image}
                alt={item.name}
                className="w-full h-32 object-cover rounded-lg"
              />

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Location:</span>
                  <p className="font-medium">{item.location}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Hours Used:</span>
                  <p className="font-medium">{item.hoursUsed}h</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Last Maintenance:</span>
                  <p className="font-medium">{item.lastMaintenance}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Next Maintenance:</span>
                  <p className="font-medium">{item.nextMaintenance}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <Calendar className="h-3 w-3 mr-1" />
                  Schedule
                </Button>
                <Button size="sm" className="flex-1">
                  <Wrench className="h-3 w-3 mr-1" />
                  Maintain
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
