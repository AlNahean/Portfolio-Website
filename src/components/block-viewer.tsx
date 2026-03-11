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
import { SidebarProvider, Sidebar, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarGroup, SidebarGroupContent } from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { type FileTree, createFileTreeForRegistryItemFiles } from "@/lib/registry"
import { getIconForLanguageExtension } from "@/components/icons"

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
  highlightedFiles?: any[]
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

export function BlockViewer({ item, highlightedFiles }: { item: any, highlightedFiles?: any[] }) {
  const [view, setView] = React.useState<"preview" | "code">("preview")
  const [viewport, setViewport] = React.useState<keyof typeof VIEWPORTS>("desktop")
  const [iframeKey, setIframeKey] = React.useState(0)
  
  // Prefer the target path to accurately represent where files install, fallback to original path
  const filePaths = React.useMemo(() => 
    item.files.map((f: any) => typeof f === 'string' ? f : (f.target || f.path)), 
    [item.files]
  )
  
  const tree = React.useMemo(() => createFileTreeForRegistryItemFiles(filePaths), [filePaths])
  const [activeFile, setActiveFile] = React.useState<string | null>(filePaths[0])

  return (
    <BlockViewerContext.Provider 
      value={{ 
        item, view, setView, activeFile, setActiveFile, tree, highlightedFiles, iframeKey, setIframeKey, viewport, setViewport 
      }}
    >
      <div className="flex flex-col gap-4 w-full min-w-0 border rounded-xl overflow-hidden bg-background shadow-sm">
        <BlockViewerToolbar />
        <div className="relative min-w-0 w-full min-h-[600px] bg-muted/10">
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
    <div className="flex items-center gap-2 p-2 border-b bg-muted/40 backdrop-blur-sm min-w-0 overflow-x-auto">
      <Tabs value={view} onValueChange={(v) => setView(v as any)} className="w-auto shrink-0">
        <TabsList className="h-8 p-1">
          <TabsTrigger value="preview" className="text-xs px-3">Preview</TabsTrigger>
          <TabsTrigger value="code" className="text-xs px-3">Code</TabsTrigger>
        </TabsList>
      </Tabs>
      
      <Separator orientation="vertical" className="mx-2 h-4 shrink-0 hidden sm:block" />
      
      {/* Device Toggles */}
      <div className="hidden sm:flex shrink-0 items-center gap-1 bg-background/50 border rounded-md p-0.5">
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

      <Separator orientation="vertical" className="mx-2 h-4 shrink-0 hidden sm:block" />

      {/* Action Buttons */}
      <div className="flex items-center gap-1 shrink-0">
          <Button variant="ghost" size="icon" className="h-7 w-7" asChild title="Open in new tab">
              <Link href={`/view/${item.name}`} target="_blank">
                  <Maximize2 className="h-3.5 w-3.5" />
              </Link>
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setIframeKey(k => k + 1)} title="Refresh">
              <RotateCw className="h-3.5 w-3.5" />
          </Button>
      </div>
      
      <div className="ml-auto hidden lg:flex shrink min-w-0 items-center rounded-md border bg-background px-3 py-1 text-[11px] font-mono text-muted-foreground shadow-sm gap-2">
        <Terminal className="h-3.5 w-3.5 shrink-0" /> 
        <span className="truncate">{cliCommand}</span>
        <button onClick={() => copyToClipboard(cliCommand)} className="hover:text-foreground transition-colors ml-1 shrink-0">
          {isCopied ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Clipboard className="h-3.5 w-3.5" />}
        </button>
      </div>
    </div>
  )
}

function BlockPreviewArea() {
  const { item, iframeKey, viewport } = useBlockViewer()
  return (
    <div className="p-4 sm:p-8 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#262626_1px,transparent_1px)] [background-size:20px_20px] flex items-center justify-center min-h-[600px] w-full min-w-0">
        <div 
          style={{ width: VIEWPORTS[viewport], maxWidth: "100%" }} 
          className="transition-all duration-500 ease-in-out shadow-2xl rounded-xl overflow-hidden border bg-background min-w-0"
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
  const { activeFile, item, highlightedFiles } = useBlockViewer()
  
  const fileData = highlightedFiles?.find(f => f.target === activeFile || f.path === activeFile) || item.files.find((f: any) => (f.target || f.path || f) === activeFile)
  const content = fileData?.content || ""
  const highlightedContent = fileData?.highlightedContent
  const language = fileData?.path?.split(".").pop() ?? "tsx"

  // Only show the sidebar if there are multiple files
  const hasMultipleFiles = item.files.length > 1;

  return (
    <div className="flex w-full min-w-0 h-[600px] bg-zinc-950 text-zinc-300">
      {hasMultipleFiles && (
        <div className="w-64 shrink-0 border-r border-zinc-800 bg-zinc-900/50 overflow-y-auto">
          <BlockViewerFileTree />
        </div>
      )}
      
      <figure
        data-rehype-pretty-code-figure=""
        className="m-0 flex min-w-0 flex-1 flex-col border-none"
      >
        <figcaption
            className="flex h-12 shrink-0 items-center gap-2 border-b border-zinc-800 px-4 py-2 text-sm text-zinc-400 [&_svg]:size-4"
            data-language={language}
        >
            {getIconForLanguageExtension(language)}
            <span className="truncate">{activeFile}</span>
            <div className="ml-auto flex items-center gap-2 shrink-0">
                <BlockCopyCodeButton content={content} />
            </div>
        </figcaption>
        
        {/* We use specific shiki target classes to override Tailwind's prose/pre resetting if any */}
        <div 
            className="flex-1 min-h-0 overflow-auto p-4 text-[13px] font-mono leading-relaxed scrollbar-thin scrollbar-thumb-zinc-800 [&_pre]:!bg-transparent [&_pre]:!p-0 [&_pre]:!m-0 [&_.line]:inline-block [&_.line]:min-h-[1rem] [&_.line]:w-full"
            dangerouslySetInnerHTML={{ __html: highlightedContent ?? `<pre><code>${content}</code></pre>` }} 
        />
      </figure>
    </div>
  )
}

export function BlockViewerFileTree() {
  const { tree } = useBlockViewer()
  if (!tree) return null

  return (
    <SidebarProvider className="flex min-h-full flex-col">
      <Sidebar collapsible="none" className="w-full flex-1 bg-transparent text-zinc-400 border-none">
        <SidebarGroupLabel className="h-12 rounded-none border-b border-zinc-800 px-4 text-xs font-semibold uppercase tracking-widest text-zinc-500">
          File Explorer
        </SidebarGroupLabel>
        <SidebarGroup className="p-0">
          <SidebarGroupContent>
            <SidebarMenu className="gap-1.5 p-2">
              {tree.map((file, index) => (
                <Tree key={index} item={file} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </Sidebar>
    </SidebarProvider>
  )
}

function Tree({ item }: { item: FileTree }) {
  const { activeFile, setActiveFile } = useBlockViewer()
  
  if (!item.children) {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton 
            isActive={item.path === activeFile} 
            onClick={() => setActiveFile(item.path!)}
            className="hover:bg-zinc-800 hover:text-white data-[active=true]:bg-zinc-800 data-[active=true]:text-white text-xs w-full min-w-0 overflow-hidden"
        >
          <File className="h-3.5 w-3.5 mr-1.5 shrink-0" /> 
          <span className="truncate">{item.name}</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    )
  }

  return (
    <Collapsible defaultOpen className="w-full min-w-0">
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton className="hover:bg-zinc-800 hover:text-white text-xs font-semibold w-full min-w-0 overflow-hidden">
            <Folder className="h-3.5 w-3.5 mr-1.5 text-zinc-400 shrink-0" /> 
            <span className="truncate">{item.name}</span>
            <ChevronRight className="ml-auto h-3 w-3 shrink-0 transition-transform group-data-[state=open]/collapsible:rotate-90" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub className="ml-4 border-l border-zinc-800 pl-2 mt-1 flex flex-col gap-0.5 w-full min-w-0">
            {item.children.map((child, i) => <Tree key={i} item={child} />)}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  )
}

function BlockCopyCodeButton({ content }: { content: string }) {
  const { copyToClipboard, isCopied } = useCopyToClipboard()

  return (
    <Button
      variant="ghost"
      size="icon"
      className="size-7 hover:text-white hover:bg-zinc-800"
      onClick={() => copyToClipboard(content)}
    >
      {isCopied ? <Check className="size-4 text-green-500" /> : <Clipboard className="size-4" />}
    </Button>
  )
}
