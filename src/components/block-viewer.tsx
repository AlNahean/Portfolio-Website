"use client"

import * as React from "react"
import Link from "next/link"
import {
  Check,
  Monitor,
  RotateCw,
  Smartphone,
  Tablet,
  Terminal,
  Clipboard,
  Maximize2,
  File,
  Folder,
  ChevronRight
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SidebarProvider, Sidebar, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub } from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { type FileTree, createFileTreeForRegistryItemFiles } from "@/lib/registry"

// Define the viewport widths
const VIEWPORTS = {
  desktop: "100%",
  tablet: "768px",
  mobile: "375px",
}

type BlockViewerContext = {
  item: any
  view: "code" | "preview"
  setView: (view: "code" | "preview") => void
  activeFile: string | null
  setActiveFile: (file: string) => void
  tree: FileTree[] | null
  iframeKey: number
  setIframeKey: React.Dispatch<React.SetStateAction<number>>
  viewport: keyof typeof VIEWPORTS
  setViewport: (v: keyof typeof VIEWPORTS) => void
}

const BlockViewerContext = React.createContext<BlockViewerContext | null>(null)

function useBlockViewer() {
  const context = React.useContext(BlockViewerContext)
  if (!context) throw new Error("useBlockViewer must be used within a BlockViewerProvider.")
  return context
}

export function BlockViewer({ item }: { item: any }) {
  const [view, setView] = React.useState<"preview" | "code">("preview")
  const [viewport, setViewport] = React.useState<keyof typeof VIEWPORTS>("desktop")
  const [iframeKey, setIframeKey] = React.useState(0)
  
  const filePaths = React.useMemo(() => 
    item.files.map((f: any) => typeof f === 'string' ? f : f.path), 
    [item.files]
  )
  
  const tree = React.useMemo(() => createFileTreeForRegistryItemFiles(filePaths), [filePaths])
  const [activeFile, setActiveFile] = React.useState<string | null>(filePaths[0])

  return (
    <BlockViewerContext.Provider 
      value={{ 
        item, view, setView, activeFile, setActiveFile, tree, iframeKey, setIframeKey, viewport, setViewport 
      }}
    >
      <div className="flex flex-col gap-4 border rounded-xl overflow-hidden bg-background shadow-sm">
        <BlockViewerToolbar />
        <div className="relative min-h-[600px] bg-muted/10">
          {view === "preview" ? <BlockPreviewArea /> : <BlockCodeArea />}
        </div>
      </div>
    </BlockViewerContext.Provider>
  )
}

function BlockViewerToolbar() {
  const { setView, view, item, setIframeKey, viewport, setViewport } = useBlockViewer()
  const { copyToClipboard, isCopied } = useCopyToClipboard()
  const cliCommand = `npx shadcn@latest add "https://nahean.vercel.app/r/${item.name}.json"`

  return (
    <div className="flex items-center gap-2 p-2 border-b bg-muted/40 backdrop-blur-sm">
      <Tabs value={view} onValueChange={(v) => setView(v as any)} className="w-auto">
        <TabsList className="h-8 p-1">
          <TabsTrigger value="preview" className="text-xs px-3">Preview</TabsTrigger>
          <TabsTrigger value="code" className="text-xs px-3">Code</TabsTrigger>
        </TabsList>
      </Tabs>
      
      <Separator orientation="vertical" className="mx-2 h-4" />
      
      {/* Device Toggles */}
      <div className="flex items-center gap-1 bg-background/50 border rounded-md p-0.5">
        <Button 
          variant={viewport === "desktop" ? "secondary" : "ghost"} 
          size="icon" className="h-7 w-7" 
          onClick={() => setViewport("desktop")}
        >
          <Monitor className="h-4 w-4" />
        </Button>
        <Button 
          variant={viewport === "tablet" ? "secondary" : "ghost"} 
          size="icon" className="h-7 w-7" 
          onClick={() => setViewport("tablet")}
        >
          <Tablet className="h-4 w-4" />
        </Button>
        <Button 
          variant={viewport === "mobile" ? "secondary" : "ghost"} 
          size="icon" className="h-7 w-7" 
          onClick={() => setViewport("mobile")}
        >
          <Smartphone className="h-4 w-4" />
        </Button>
      </div>

      <Separator orientation="vertical" className="mx-2 h-4" />

      {/* Action Buttons */}
      <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-7 w-7" asChild title="Open in new tab">
              <Link href={`/view/${item.name}`} target="_blank">
                  <Maximize2 className="h-3.5 w-3.5" />
              </Link>
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setIframeKey(k => k + 1)} title="Refresh">
              <RotateCw className="h-3.5 w-3.5" />
          </Button>
      </div>
      
      <div className="ml-auto hidden lg:flex items-center rounded-md border bg-background px-3 py-1 text-[11px] font-mono text-muted-foreground shadow-sm gap-2">
        <Terminal className="h-3.5 w-3.5" /> 
        <span className="truncate max-w-[200px]">{cliCommand}</span>
        <button onClick={() => copyToClipboard(cliCommand)} className="hover:text-foreground transition-colors ml-1">
          {isCopied ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Clipboard className="h-3.5 w-3.5" />}
        </button>
      </div>
    </div>
  )
}

function BlockPreviewArea() {
  const { item, iframeKey, viewport } = useBlockViewer()
  return (
    <div className="p-4 sm:p-8 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#262626_1px,transparent_1px)] [background-size:20px_20px] flex items-center justify-center min-h-[600px]">
        {/* The magic resizable wrapper */}
        <div 
          style={{ width: VIEWPORTS[viewport] }} 
          className="transition-all duration-500 ease-in-out shadow-2xl rounded-xl overflow-hidden border bg-background"
        >
          <iframe 
            key={iframeKey}
            src={`/view/${item.name}`} 
            className="w-full h-[600px] border-none"
          />
        </div>
    </div>
  )
}

function BlockCodeArea() {
  const { tree, activeFile, item } = useBlockViewer()
  const activeFileData = item.files.find((f: any) => (f.path || f) === activeFile)
  const content = activeFileData?.content || ""

  return (
    <div className="flex h-[600px] bg-zinc-950 text-zinc-300">
      <div className="w-64 border-r border-zinc-800 bg-zinc-900/50 overflow-y-auto">
        <SidebarProvider>
          <Sidebar collapsible="none" className="w-full bg-transparent text-zinc-400">
            <SidebarGroupLabel className="px-4 py-3 text-zinc-500 text-xs uppercase tracking-widest border-b border-zinc-800">File Explorer</SidebarGroupLabel>
            <SidebarMenu className="p-2">
              {tree?.map((node, i) => <TreeItem key={i} node={node} />)}
            </SidebarMenu>
          </Sidebar>
        </SidebarProvider>
      </div>
      <div className="flex-1 p-0 overflow-hidden flex flex-col">
          <div className="bg-zinc-900 px-4 py-2 border-b border-zinc-800 text-[11px] font-mono text-zinc-500 flex justify-between items-center">
              {activeFile}
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(content);
                }} 
                className="hover:text-zinc-200"
              >
                Copy
              </button>
          </div>
          <pre className="flex-1 overflow-auto p-4 text-sm font-mono leading-relaxed text-zinc-300 scrollbar-thin scrollbar-thumb-zinc-800">
            <code>{content}</code>
          </pre>
      </div>
    </div>
  )
}

function TreeItem({ node }: { node: FileTree }) {
  const { activeFile, setActiveFile } = useBlockViewer()
  
  if (!node.children) {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton 
            isActive={node.path === activeFile} 
            onClick={() => setActiveFile(node.path!)}
            className="hover:bg-zinc-800 data-[active=true]:bg-primary/20 data-[active=true]:text-primary text-xs"
        >
          <File className="h-3.5 w-3.5 mr-2" /> {node.name}
        </SidebarMenuButton>
      </SidebarMenuItem>
    )
  }

  return (
    <Collapsible defaultOpen className="w-full">
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton className="hover:bg-zinc-800 text-xs font-semibold">
            <Folder className="h-3.5 w-3.5 mr-2 text-primary/70" /> {node.name}
            <ChevronRight className="ml-auto h-3 w-3 transition-transform group-data-[state=open]/collapsible:rotate-90" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub className="ml-4 border-l border-zinc-800 pl-2 mt-1 flex flex-col gap-1">
            {node.children.map((child, i) => <TreeItem key={i} node={child} />)}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  )
}
