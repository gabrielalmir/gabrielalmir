"use client"

import * as React from "react"
import { Command as CommandPrimitive } from "cmdk"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Search, Calculator, Calendar, CreditCard, Settings, Smile, User, Code, FileText, Mail, Github, Linkedin, Twitter, Laptop } from "lucide-react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { DialogDescription } from "@radix-ui/react-dialog"

export function CommandMenu() {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = React.useCallback((command: () => void) => {
    setOpen(false)
    command()
  }, [])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="overflow-hidden p-0 shadow-2xl border border-vesper-orange/20 bg-background/95 backdrop-blur-xl max-w-[640px]">
        <DialogTitle className="sr-only">Menu de Comandos</DialogTitle>
        <DialogDescription className="sr-only">
          Navegue pelo portfolio usando comandos rápidos
        </DialogDescription>
        <CommandPrimitive className="flex h-full w-full flex-col overflow-hidden rounded-md bg-transparent text-popover-foreground">
          <div className="flex items-center border-b border-vesper-orange/10 px-3" cmdk-input-wrapper="">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50 text-vesper-orange" />
            <CommandPrimitive.Input
              placeholder="Digite um comando ou pesquise..."
              className="flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            />
            <div className="text-xs text-muted-foreground flex gap-1">
               <span className="bg-muted px-1.5 py-0.5 rounded border border-border">ESC</span>
            </div>
          </div>
          <CommandPrimitive.List className="max-h-[300px] overflow-y-auto overflow-x-hidden p-2">
            <CommandPrimitive.Empty className="py-6 text-center text-sm text-muted-foreground">
              Nenhum resultado encontrado.
            </CommandPrimitive.Empty>

            <CommandPrimitive.Group heading="Navegação" className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
              <CommandItem onSelect={() => runCommand(() => router.push('/#sobre'))}>
                <User className="mr-2 h-4 w-4" />
                <span>Sobre Mim</span>
              </CommandItem>
              <CommandItem onSelect={() => runCommand(() => router.push('/#projetos'))}>
                <Code className="mr-2 h-4 w-4" />
                <span>Projetos</span>
              </CommandItem>
              <CommandItem onSelect={() => runCommand(() => router.push('/#habilidades'))}>
                <Laptop className="mr-2 h-4 w-4" />
                <span>Skills</span>
              </CommandItem>
              <CommandItem onSelect={() => runCommand(() => router.push('/blog'))}>
                <FileText className="mr-2 h-4 w-4" />
                <span>Blog</span>
              </CommandItem>
            </CommandPrimitive.Group>

            <CommandPrimitive.Group heading="Social" className="px-2 py-1.5 text-xs font-medium text-muted-foreground mt-2">
              <CommandItem onSelect={() => runCommand(() => window.open('https://github.com/gabrielalmir', '_blank'))}>
                <Github className="mr-2 h-4 w-4" />
                <span>GitHub</span>
              </CommandItem>
              <CommandItem onSelect={() => runCommand(() => window.open('https://linkedin.com/in/gabrielalmir', '_blank'))}>
                <Linkedin className="mr-2 h-4 w-4" />
                <span>LinkedIn</span>
              </CommandItem>
              <CommandItem onSelect={() => runCommand(() => window.open('mailto:gabr.almir@gmail.com', '_blank'))}>
                <Mail className="mr-2 h-4 w-4" />
                <span>Email</span>
              </CommandItem>
            </CommandPrimitive.Group>

             <CommandPrimitive.Group heading="Sistema" className="px-2 py-1.5 text-xs font-medium text-muted-foreground mt-2">
                <CommandItem onSelect={() => runCommand(() => window.open('https://github.com/gabrielalmir/gabrielalmir', '_blank'))}>
                    <Code className="mr-2 h-4 w-4" />
                    <span>Ver Código Fonte</span>
                </CommandItem>
             </CommandPrimitive.Group>
          </CommandPrimitive.List>
        </CommandPrimitive>
      </DialogContent>
    </Dialog>
  )
}

function CommandItem({ children, onSelect }: { children: React.ReactNode, onSelect: () => void }) {
  return (
    <CommandPrimitive.Item
      onSelect={onSelect}
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm px-2 py-2 text-sm outline-none aria-selected:bg-vesper-orange/10 aria-selected:text-vesper-orange data-[disabled]:pointer-events-none data-[disabled]:opacity-50 transition-colors cursor-pointer"
      )}
    >
      {children}
    </CommandPrimitive.Item>
  )
}

