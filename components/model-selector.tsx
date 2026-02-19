"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sparkles } from "lucide-react"

interface ModelSelectorProps {
  models: Array<{ id: string; name: string }>
  selectedModel: string
  onModelChange: (model: string) => void
  disabled?: boolean
}

export function ModelSelector({ models, selectedModel, onModelChange, disabled }: ModelSelectorProps) {
  return (
    <Select value={selectedModel} onValueChange={onModelChange} disabled={disabled}>
      <SelectTrigger className="w-56 bg-[#1A1B1F]/80 backdrop-blur-sm border-[#202126] text-white hover:bg-[#202126] transition-all duration-200 shadow-sm hover:shadow-md">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#8C5CF7]" />
          <SelectValue placeholder="Select model" />
        </div>
      </SelectTrigger>
      <SelectContent className="bg-[#1A1B1F]/95 backdrop-blur-sm border-[#202126] shadow-xl">
        {models.map((model) => (
          <SelectItem
            key={model.id}
            value={model.id}
            className="text-white hover:bg-[#202126] focus:bg-[#202126] cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#8C5CF7] rounded-full"></div>
              {model.name}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
