import type { ReactNode } from "react"
import { Button } from "./button"
import { Separator } from "./separator"
import { SidebarTrigger } from "./sidebar"

import { Bell, FileChartColumn, Network, Settings } from "lucide-react"
import { DropdownMenu } from "./dropdown-menu"
import { DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { Link } from "react-router-dom"

export function SiteHeader({ currentPath, }: { currentPath: ReactNode }) {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b border-b-gray-300 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium capitalize">{currentPath}</h1>
        <div className="ml-auto flex items-center gap-2">

          <div className="flex gap-2">
            <Link to={'/network'}>
              <Button variant={"outline"}>
                <Network /><span className="hidden lg:block xl:block">Network</span>
              </Button>
            </Link>
            <Link to={'/settings'}>
              <Button variant={"outline"}>
                <Settings /><span className="hidden lg:block xl:block">Settings</span>
              </Button>
            </Link>
            <Button variant={"outline"}>
              <FileChartColumn />
              <span className="hidden lg:block xl:block">Reports</span>
            </Button>
          </div>
          <Button variant="outline" asChild size="sm" className="hidden sm:flex">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline"><Bell /><span className="hidden lg:block xl:block">Notifications</span></Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="px-2 py-3 rounded-lg w-50 border border-gray-200 bg-white" align="end">
                <label className=" text-sm">Notifications</label>
                <DropdownMenuGroup>
                  <DropdownMenuItem className="py-2 px-2 outline-0 hover:bg-gray-200 hover:rounded-lg">One</DropdownMenuItem>
                  <DropdownMenuItem className="py-2 px-2 outline-0 hover:bg-gray-200 hover:rounded-lg">One</DropdownMenuItem>
                  <DropdownMenuItem className="py-2 px-2 outline-0 hover:bg-gray-200 hover:rounded-lg">One</DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </Button>

        </div>
      </div>
    </header>
  )
}
