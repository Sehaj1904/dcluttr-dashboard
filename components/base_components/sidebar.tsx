"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { VariantProps, cva } from "class-variance-authority"
import { PanelLeft } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/base_components/button"
import { Input } from "@/components/base_components/input"
import { Separator } from "@/components/base_components/separator"
import { Sheet, SheetContent } from "@/components/base_components/sheet"
import { Skeleton } from "@/components/base_components/skeleton"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/base_components/tooltip"

const SIDEBAR_COOKIE_NAME = "sidebar:state"
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_WIDTH = "16rem"
const SIDEBAR_WIDTH_MOBILE = "18rem"
const SIDEBAR_WIDTH_ICON = "3rem"
const SIDEBAR_KEYBOARD_SHORTCUT = "b"

type SidebarContextValue = {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  isRailOpen: boolean
  setIsRailOpen: (value: boolean) => void
  isSubOpen: boolean
  setIsSubOpen: (value: boolean) => void
  subMenuId: string | null
  setSubMenuId: (value: string | null) => void
  subMenuTitle: string | null
  setSubMenuTitle: (value: string | null) => void
  subMenuDescription: string | null
  setSubMenuDescription: (value: string | null) => void
  subMenuContent: React.ReactNode | null
  setSubMenuContent: (value: React.ReactNode | null) => void
}

const SidebarContext = React.createContext<SidebarContextValue>({
  isOpen: false,
  setIsOpen: () => {},
  isRailOpen: false,
  setIsRailOpen: () => {},
  isSubOpen: false,
  setIsSubOpen: () => {},
  subMenuId: null,
  setSubMenuId: () => {},
  subMenuTitle: null,
  setSubMenuTitle: () => {},
  subMenuDescription: null,
  setSubMenuDescription: () => {},
  subMenuContent: null,
  setSubMenuContent: () => {},
})

const SidebarProvider = ({
  children,
  ...props
}: any) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const [isRailOpen, setIsRailOpen] = React.useState(false)
  const [isSubOpen, setIsSubOpen] = React.useState(false)
  const [subMenuId, setSubMenuId] = React.useState<string | null>(null)
  const [subMenuTitle, setSubMenuTitle] = React.useState<string | null>(null)
  const [subMenuDescription, setSubMenuDescription] = React.useState<string | null>(null)
  const [subMenuContent, setSubMenuContent] = React.useState<React.ReactNode | null>(null)

  return (
    <SidebarContext.Provider
      value={{
        isOpen,
        setIsOpen,
        isRailOpen,
        setIsRailOpen,
        isSubOpen,
        setIsSubOpen,
        subMenuId,
        setSubMenuId,
        subMenuTitle,
        setSubMenuTitle,
        subMenuDescription,
        setSubMenuDescription,
        subMenuContent,
        setSubMenuContent,
      }}
    >
      <div {...props}>{children}</div>
    </SidebarContext.Provider>
  )
}

const useSidebar = (): any => {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}

const Sidebar = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const { isOpen, setIsOpen } = useSidebar()

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent
        position="left"
        className={cn("w-[280px] p-0", className)}
        {...props}
      >
        {children}
      </SheetContent>
    </Sheet>
  )
}

const SidebarTrigger = ({
  className,
  children,
  asChild,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean
}) => {
  const { setIsOpen } = useSidebar()
  const Comp = asChild ? Slot : Button

  return (
    <Comp
      variant="ghost"
      className={cn("h-9 w-9 p-0", className)}
      onClick={() => setIsOpen(true)}
      {...props}
    >
      {children}
    </Comp>
  )
}

const SidebarRail = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const { isRailOpen } = useSidebar()

  if (!isRailOpen) {
    return null
  }

  return (
    <div
      className={cn(
        "fixed inset-y-0 z-20 flex h-full w-[80px] flex-col border-r bg-background",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

const SidebarInset = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn("absolute inset-x-0 bottom-0 top-14", className)}
      {...props}
    >
      {children}
    </div>
  )
}

const SidebarInput = ({
  className,
  ...props
}: React.ComponentProps<typeof Input>) => {
  return (
    <Input
      className={cn("h-9 w-full bg-transparent px-3 py-2", className)}
      {...props}
    />
  )
}

const SidebarHeader = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn("flex h-[60px] items-center px-6", className)}
      {...props}
    >
      {children}
    </div>
  )
}

const SidebarFooter = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn("mt-auto flex items-center p-6", className)}
      {...props}
    >
      {children}
    </div>
  )
}

const SidebarSeparator = ({
  className,
  ...props
}: React.ComponentProps<typeof Separator>) => {
  return (
    <Separator
      className={cn("-mx-6 my-6 w-auto", className)}
      {...props}
    />
  )
}

const SidebarContent = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn("flex-1 overflow-auto", className)}
      {...props}
    >
      {children}
    </div>
  )
}

const SidebarGroup = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn("px-6 py-2", className)}
      {...props}
    >
      {children}
    </div>
  )
}

const SidebarGroupLabel = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "flex items-center px-2 py-1 text-xs font-medium text-muted-foreground",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

const SidebarGroupAction = ({
  className,
  children,
  asChild,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean
}) => {
  const Comp = asChild ? Slot : Button

  return (
    <Comp
      variant="ghost"
      size="icon"
      className={cn(
        "ml-auto h-4 w-4 shrink-0 translate-x-2 rounded-sm border opacity-0 hover:bg-accent hover:opacity-100 group-hover:opacity-100",
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  )
}

const SidebarGroupContent = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn("space-y-1", className)} {...props}>
      {children}
    </div>
  )
}

const SidebarMenu = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn("flex flex-col gap-2 px-6 py-2", className)}
      {...props}
    >
      {children}
    </div>
  )
}

const SidebarMenuItem = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn("flex items-center gap-4 [&>button]:w-full", className)}
      {...props}
    >
      {children}
    </div>
  )
}

const SidebarMenuButton = ({
  className,
  children,
  asChild,
  isActive,
  isLoading,
  isSubmenu,
  submenuTrigger,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean
  isActive?: boolean
  isLoading?: boolean
  isSubmenu?: boolean
  submenuTrigger?: {
    id: string
    title: string
    description?: string
    content: React.ReactNode
  }
}) => {
  const { setIsSubOpen, setSubMenuId, setSubMenuTitle, setSubMenuDescription, setSubMenuContent } = useSidebar()
  const Comp = asChild ? Slot : Button

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (submenuTrigger) {
      e.preventDefault()
      setSubMenuId(submenuTrigger.id)
      setSubMenuTitle(submenuTrigger.title)
      setSubMenuDescription(submenuTrigger.description || null)
      setSubMenuContent(submenuTrigger.content)
      setIsSubOpen(true)
    }
    props.onClick?.(e)
  }

  return (
    <Comp
      variant={isActive ? "secondary" : "ghost"}
      className={cn(
        "group relative h-9 w-full justify-start px-3",
        isSubmenu && "pl-8",
        className
      )}
      onClick={handleClick}
      {...props}
    >
      {isLoading ? (
        <Skeleton className="h-4 w-4" />
      ) : (
        children
      )}
    </Comp>
  )
}

const SidebarMenuAction = ({
  className,
  children,
  asChild,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean
}) => {
  const Comp = asChild ? Slot : Button

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Comp
            variant="ghost"
            className={cn(
              "ml-auto h-8 w-8 shrink-0 rounded-sm border opacity-0 hover:bg-accent hover:opacity-100 group-hover:opacity-100",
              className
            )}
            {...props}
          >
            {children}
          </Comp>
        </TooltipTrigger>
        <TooltipContent>Add page</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

const SidebarMenuBadge = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

const SidebarMenuSkeleton = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn("flex items-center gap-4", className)}
      {...props}
    >
      <Skeleton className="h-4 w-4" />
      <div className="space-y-1">
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-3 w-[150px]" />
      </div>
      <Skeleton className="ml-auto h-4 w-4" />
    </div>
  )
}

const SidebarMenuSub = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn("mt-2 space-y-4 px-6", className)} {...props}>
      {children}
    </div>
  )
}

const SidebarMenuSubItem = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn("flex items-center gap-4", className)} {...props}>
      {children}
    </div>
  )
}

const SidebarMenuSubButton = ({
  className,
  children,
  asChild,
  isActive,
  isLoading,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean
  isActive?: boolean
  isLoading?: boolean
}) => {
  const Comp = asChild ? Slot : Button

  return (
    <Comp
      variant={isActive ? "secondary" : "ghost"}
      className={cn(
        "group relative h-9 w-full justify-start px-8",
        className
      )}
      {...props}
    >
      {isLoading ? (
        <Skeleton className="h-4 w-4" />
      ) : (
        children
      )}
    </Comp>
  )
}

export {
  Sidebar,
  SidebarTrigger,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
  SidebarSeparator,
  SidebarInput,
  SidebarRail,
  SidebarInset,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarProvider,
}
