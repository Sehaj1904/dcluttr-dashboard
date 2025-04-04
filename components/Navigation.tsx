"use client"

import type React from "react"

import { useState } from "react"
import { ChevronDown, Home, BarChart2, Image, HelpCircle, Settings, ChevronLeft } from "lucide-react"
import { theme } from "../theme"

interface NavigationItem {
  id: string
  label: string
  icon: React.ReactNode
  isExpanded?: boolean
  isActive?: boolean
  subItems?: NavigationSubItem[]
}

interface NavigationSubItem {
  id: string
  label: string
  isActive?: boolean
}

export default function Navigation() {
  const [selectedBrand, setSelectedBrand] = useState({
    name: "Test_brand",
    initials: "SS",
  })

  const [navItems, setNavItems] = useState<NavigationItem[]>([
    {
      id: "overview",
      label: "Overview",
      icon: <Home size={20} color={theme.colors.icon.default} />,
      isActive: true,
    },
    {
      id: "channels",
      label: "Channels",
      icon: <BarChart2 size={20} color={theme.colors.icon.default} />,
      isExpanded: true,
      subItems: [
        {
          id: "meta-ads",
          label: "Meta Ads",
        },
        {
          id: "google-ads",
          label: "Google Ads",
        },
        {
          id: "quick-commerce",
          label: "Quick Commerce",
          isActive: true,
        },
      ],
    },
    {
      id: "creatives",
      label: "Creatives",
      icon: <Image size={20} color={theme.colors.icon.default} />,
    },
  ])

  const toggleExpand = (id: string) => {
    setNavItems(
      navItems.map((item) => ({
        ...item,
        isExpanded: item.id === id ? !item.isExpanded : item.isExpanded,
      })),
    )
  }

  const selectSubItem = (navId: string, subId: string) => {
    setNavItems(
      navItems.map((item) => ({
        ...item,
        isActive: item.id === navId && !item.subItems,
        subItems: item.subItems?.map((subItem) => ({
          ...subItem,
          isActive: subItem.id === subId,
        })),
      })),
    )
  }

  return (
    <div className="w-64 bg-[#F5F5F5] h-full flex flex-col border-r border-[#E0E0E0]">
      <div className="p-4 flex items-center justify-between bg-white rounded-full mx-4 mt-4 mb-6">
        <div className="flex items-center">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white font-medium mr-2"
            style={{ backgroundColor: theme.colors.avatar.teal }}
          >
            {selectedBrand.initials}
          </div>
          <div className="font-medium text-[#161616]">{selectedBrand.name}</div>
        </div>
        <div className="flex items-center">
          <ChevronDown size={16} className="cursor-pointer text-[#6F6F6F]" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="px-4">
          {navItems.map((item) => (
            <div key={item.id} className="mb-4">
              <div
                className={`flex items-center justify-between p-2 rounded-md cursor-pointer`}
                onClick={() => !item.subItems && selectSubItem(item.id, "")}
              >
                <div className="flex items-center">
                  {item.icon}
                  <span
                    className={`ml-3 font-medium text-[15px] ${item.isActive ? "text-[#161616]" : "text-[#6F6F6F]"}`}
                  >
                    {item.label}
                  </span>
                </div>
                {item.subItems && (
                  <div
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleExpand(item.id)
                    }}
                    className="text-[#6F6F6F]"
                  >
                    {item.isExpanded ? <ChevronDown size={16} /> : <ChevronDown size={16} />}
                  </div>
                )}
              </div>

              {item.subItems && item.isExpanded && (
                <div className="ml-8 mt-2">
                  {item.subItems.map((subItem) => (
                    <div
                      key={subItem.id}
                      className={`p-2 cursor-pointer text-[14px] ${
                        subItem.isActive
                          ? "bg-[#E8F2EF] rounded-md text-[#006D5B] font-medium"
                          : "font-normal text-[#8D8D8D]"
                      }`}
                      onClick={() => selectSubItem(item.id, subItem.id)}
                    >
                      {subItem.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-auto px-4 pb-4 sticky bottom-0 bg-[#F5F5F5]">
        <div className="flex items-center p-2 mb-4 cursor-pointer">
          <HelpCircle size={20} color={theme.colors.icon.default} />
          <span className="ml-3 font-medium text-[15px] text-[#6F6F6F]">Help</span>
        </div>
        <div className="flex items-center p-2 cursor-pointer">
          <Settings size={20} color={theme.colors.icon.default} />
          <span className="ml-3 font-medium text-[15px] text-[#6F6F6F]">Settings</span>
        </div>
      </div>

      <div className="absolute top-4 right-4">
        <ChevronLeft size={20} className="text-[#006D5B] cursor-pointer" />
      </div>
    </div>
  )
}

