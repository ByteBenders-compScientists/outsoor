import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Search, Code, BookOpen, Play, Copy, ExternalLink, Download, Github } from "lucide-react"

// Force dynamic rendering to prevent prerendering issues with Client Components
export const dynamic = 'force-dynamic'

export default function APIReferencePage() {
  const apiEndpoints = [
    {
      method: "POST",
      path: "/v1/chat/completions",
      description: "Create a chat completion",
      category: "Chat",
      status: "Stable"
    },
    {
      method: "POST",
      path: "/v1/completions",
      description: "Create a text completion",
      category: "Text",
      status: "Stable"
    },
    {
      method: "POST",
      path: "/v1/embeddings",
      description: "Create embeddings for text",
      category: "Embeddings",
      status: "Stable"
    },
    {
      method: "POST",
      path: "/v1/images/generations",
      description: "Generate images from text",
      category: "Images",
      status: "Beta"
    },
    {
      method: "POST",
      path: "/v1/audio/transcriptions",
      description: "Transcribe audio to text",
      category: "Audio",
      status: "Stable"
    },
    {
      method: "POST",
      path: "/v1/audio/translations",
      description: "Translate audio to text",
      category: "Audio",
      status: "Beta"
    }
  ]

  const codeExamples = {
    python: `import requests

url = "https://api.outsoor.com/v1/chat/completions"
headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}
data = {
    "model": "gpt-4",
    "messages": [
        {"role": "user", "content": "Hello, how are you?"}
    ]
}

response = requests.post(url, headers=headers, json=data)
print(response.json())`,
    
    javascript: `const response = await fetch('https://api.outsoor.com/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: 'gpt-4',
    messages: [
      { role: 'user', content: 'Hello, how are you?' }
    ],
  }),
});

const data = await response.json();
console.log(data);`,
    
    curl: `curl https://api.outsoor.com/v1/chat/completions \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "gpt-4",
    "messages": [
      {"role": "user", "content": "Hello, how are you?"}
    ]
  }'`
  }

  const sdkDownloads = [
    { name: "Python", version: "1.2.0", downloads: "45.2K", icon: "🐍" },
    { name: "JavaScript", version: "2.1.0", downloads: "67.8K", icon: "🟨" },
    { name: "Java", version: "1.0.5", downloads: "23.4K", icon: "☕" },
    { name: "C#", version: "1.1.2", downloads: "18.9K", icon: "🔷" },
    { name: "Go", version: "0.9.1", downloads: "12.3K", icon: "🐹" },
    { name: "PHP", version: "1.0.3", downloads: "15.7K", icon: "🐘" }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">API Reference</h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Complete API documentation with examples, SDKs, and interactive tools to help you integrate Outsoor APIs.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto relative mb-8">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="text"
                placeholder="Search API endpoints..."
                className="pl-10 pr-4 py-3"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-green-500 hover:bg-green-600">
                <Play className="w-4 h-4 mr-2" />
                Try API
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Download SDKs
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Start */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-semibold text-foreground mb-6">Quick Start</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="w-5 h-5" />
                Authentication
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                All API requests require authentication using your API key in the Authorization header.
              </p>
              <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                Authorization: Bearer YOUR_API_KEY
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Base URL
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                All API requests should be made to the following base URL:
              </p>
              <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                https://api.outsoor.com
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* API Endpoints */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-semibold text-foreground mb-6">API Endpoints</h2>
        <div className="space-y-4">
          {apiEndpoints.map((endpoint) => (
            <Card key={endpoint.path} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <Badge variant={endpoint.method === 'GET' ? 'default' : endpoint.method === 'POST' ? 'secondary' : 'destructive'}>
                    {endpoint.method}
                  </Badge>
                  <code className="font-mono text-sm bg-muted px-2 py-1 rounded">
                    {endpoint.path}
                  </code>
                  <Badge variant="outline">{endpoint.category}</Badge>
                  <Badge variant={endpoint.status === 'Stable' ? 'default' : 'secondary'}>
                    {endpoint.status}
                  </Badge>
                  <span className="text-muted-foreground text-sm">{endpoint.description}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Code Examples */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-semibold text-foreground mb-6">Code Examples</h2>
        <Tabs defaultValue="python" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="python">Python</TabsTrigger>
            <TabsTrigger value="javascript">JavaScript</TabsTrigger>
            <TabsTrigger value="curl">cURL</TabsTrigger>
          </TabsList>
          <TabsContent value="python" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Python Example</CardTitle>
                  <Button variant="outline" size="sm">
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                  <code className="text-sm">{codeExamples.python}</code>
                </pre>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="javascript" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>JavaScript Example</CardTitle>
                  <Button variant="outline" size="sm">
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                  <code className="text-sm">{codeExamples.javascript}</code>
                </pre>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="curl" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>cURL Example</CardTitle>
                  <Button variant="outline" size="sm">
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                  <code className="text-sm">{codeExamples.curl}</code>
                </pre>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* SDK Downloads */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-semibold text-foreground mb-6">Official SDKs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sdkDownloads.map((sdk) => (
            <Card key={sdk.name} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{sdk.icon}</span>
                  <div>
                    <CardTitle className="text-lg">{sdk.name}</CardTitle>
                    <CardDescription>v{sdk.version}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{sdk.downloads} downloads</span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Github className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Additional Resources */}
      <div className="bg-muted/30 border-t border-border/20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Need More Help?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Explore our comprehensive documentation, tutorials, and community resources
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline">
                <BookOpen className="w-4 h-4 mr-2" />
                View Documentation
              </Button>
              <Button variant="outline">
                <Play className="w-4 h-4 mr-2" />
                Watch Tutorials
              </Button>
              <Button variant="outline">
                <ExternalLink className="w-4 h-4 mr-2" />
                Community Forum
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
