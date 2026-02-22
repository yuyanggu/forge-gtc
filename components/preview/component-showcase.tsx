"use client";

import { useState } from "react";
import {
  Bell,
  Bold,
  Check,
  ChevronRight,
  CreditCard,
  Italic,
  Mail,
  Plus,
  Settings,
  Terminal,
  Trash2,
  Underline,
  User,
} from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
      {children}
    </h2>
  );
}

function ShowcaseSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4">
      <SectionHeading>{title}</SectionHeading>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function ButtonsSection() {
  return (
    <ShowcaseSection title="Buttons & Actions">
      <div className="flex flex-wrap gap-2">
        <Button>Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="link">Link</Button>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button size="sm">
          <Plus className="mr-1 h-3.5 w-3.5" /> Add Item
        </Button>
        <Button size="sm" variant="outline">
          <Mail className="mr-1 h-3.5 w-3.5" /> Email
        </Button>
        <Button size="sm" variant="destructive">
          <Trash2 className="mr-1 h-3.5 w-3.5" /> Delete
        </Button>
      </div>
      <ToggleGroup type="multiple" defaultValue={["bold"]}>
        <ToggleGroupItem value="bold" aria-label="Bold">
          <Bold className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Italic">
          <Italic className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Underline">
          <Underline className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    </ShowcaseSection>
  );
}

function FormControlsSection() {
  return (
    <ShowcaseSection title="Form Controls">
      <div className="space-y-3">
        <div className="space-y-1.5">
          <Label htmlFor="preview-name">Name</Label>
          <Input id="preview-name" placeholder="Enter your name" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="preview-email">Email</Label>
          <Input
            id="preview-email"
            type="email"
            placeholder="you@example.com"
          />
        </div>
        <div className="space-y-1.5">
          <Label>Framework</Label>
          <Select defaultValue="next">
            <SelectTrigger>
              <SelectValue placeholder="Select a framework" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="next">Next.js</SelectItem>
              <SelectItem value="remix">Remix</SelectItem>
              <SelectItem value="astro">Astro</SelectItem>
              <SelectItem value="vite">Vite</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="preview-bio">Bio</Label>
          <Textarea
            id="preview-bio"
            placeholder="Tell us about yourself"
            rows={3}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="preview-terms" defaultChecked />
          <Label htmlFor="preview-terms" className="text-sm">
            Accept terms and conditions
          </Label>
        </div>
        <RadioGroup defaultValue="comfortable">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="comfortable" id="r1" />
            <Label htmlFor="r1">Comfortable</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="compact" id="r2" />
            <Label htmlFor="r2">Compact</Label>
          </div>
        </RadioGroup>
        <div className="flex items-center space-x-2">
          <Switch id="preview-notifications" defaultChecked />
          <Label htmlFor="preview-notifications">Enable notifications</Label>
        </div>
        <div className="space-y-1.5">
          <Label>Volume</Label>
          <Slider defaultValue={[65]} max={100} step={1} />
        </div>
      </div>
    </ShowcaseSection>
  );
}

function DataDisplaySection() {
  return (
    <ShowcaseSection title="Data Display">
      <Card>
        <CardHeader>
          <CardTitle>Project Overview</CardTitle>
          <CardDescription>
            Your project statistics at a glance.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            You have <strong className="text-foreground">12</strong> active
            projects and <strong className="text-foreground">4</strong> pending
            reviews.
          </p>
        </CardContent>
        <CardFooter className="gap-2">
          <Button size="sm">View All</Button>
          <Button size="sm" variant="outline">
            Dismiss
          </Button>
        </CardFooter>
      </Card>

      <div className="flex flex-wrap gap-2">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="destructive">Destructive</Badge>
      </div>

      <div className="flex gap-2">
        <Avatar>
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>AB</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>MK</AvatarFallback>
        </Avatar>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              { name: "Alice", status: "Active", role: "Admin", amount: "$250" },
              { name: "Bob", status: "Pending", role: "Editor", amount: "$150" },
              { name: "Carol", status: "Active", role: "Viewer", amount: "$350" },
              { name: "Dave", status: "Inactive", role: "Editor", amount: "$100" },
            ].map((row) => (
              <TableRow key={row.name}>
                <TableCell className="font-medium">{row.name}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>{row.role}</TableCell>
                <TableCell className="text-right">{row.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </ShowcaseSection>
  );
}

function FeedbackSection() {
  return (
    <ShowcaseSection title="Feedback">
      <Alert>
        <Terminal className="h-4 w-4" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          You can customize components using the sidebar controls.
        </AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <Terminal className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Your session has expired. Please log in again.
        </AlertDescription>
      </Alert>
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => toast.success("Settings saved successfully!")}
        >
          Show Toast
        </Button>
        <div className="flex-1">
          <Progress value={66} />
        </div>
      </div>
    </ShowcaseSection>
  );
}

function OverlaySection() {
  return (
    <ShowcaseSection title="Overlays">
      <div className="flex flex-wrap gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              Open Dialog
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-3 py-4">
              <div className="space-y-1.5">
                <Label htmlFor="dialog-name">Name</Label>
                <Input id="dialog-name" defaultValue="John Doe" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="dialog-email">Email</Label>
                <Input id="dialog-email" defaultValue="john@example.com" />
              </div>
            </div>
            <DialogFooter>
              <Button>Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm">
              Open Sheet
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Settings</SheetTitle>
              <SheetDescription>
                Configure your preferences.
              </SheetDescription>
            </SheetHeader>
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <Label>Dark Mode</Label>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <Label>Notifications</Label>
                <Switch defaultChecked />
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm">
              Open Popover
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-72">
            <div className="space-y-2">
              <h4 className="font-medium">Dimensions</h4>
              <p className="text-sm text-muted-foreground">
                Set the dimensions for the layer.
              </p>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="w" className="text-xs">
                    Width
                  </Label>
                  <Input id="w" defaultValue="100%" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="h" className="text-xs">
                    Height
                  </Label>
                  <Input id="h" defaultValue="auto" />
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm">
                Hover Me
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>This is a tooltip</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </ShowcaseSection>
  );
}

function NavigationSection() {
  return (
    <ShowcaseSection title="Navigation">
      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="account" className="rounded-lg border p-4">
          <p className="text-sm text-muted-foreground">
            Manage your account settings and preferences.
          </p>
        </TabsContent>
        <TabsContent value="password" className="rounded-lg border p-4">
          <p className="text-sm text-muted-foreground">
            Change your password and security settings.
          </p>
        </TabsContent>
        <TabsContent value="settings" className="rounded-lg border p-4">
          <p className="text-sm text-muted-foreground">
            Configure your application settings.
          </p>
        </TabsContent>
      </Tabs>

      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Components</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </ShowcaseSection>
  );
}

function LoginCardExample() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Enter your credentials to access your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-1.5">
          <Label htmlFor="login-email">Email</Label>
          <Input id="login-email" type="email" placeholder="you@example.com" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="login-pass">Password</Label>
          <Input id="login-pass" type="password" placeholder="••••••••" />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Sign In</Button>
      </CardFooter>
    </Card>
  );
}

function SettingsPanelExample() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-4 w-4" />
          Settings
        </CardTitle>
        <CardDescription>Manage your preferences.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Marketing Emails</p>
            <p className="text-xs text-muted-foreground">
              Receive product updates
            </p>
          </div>
          <Switch defaultChecked />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Security Alerts</p>
            <p className="text-xs text-muted-foreground">
              Get notified about security events
            </p>
          </div>
          <Switch defaultChecked />
        </div>
        <div className="space-y-1.5">
          <Label>Language</Label>
          <Select defaultValue="en">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="fr">French</SelectItem>
              <SelectItem value="de">German</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
      <CardFooter>
        <Button size="sm">Save Changes</Button>
      </CardFooter>
    </Card>
  );
}

function NotificationCardExample() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-4 w-4" />
          Notifications
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {[
          {
            initials: "JD",
            name: "John Doe",
            action: "commented on your post",
            time: "2m ago",
            badge: "New",
          },
          {
            initials: "AB",
            name: "Alice Brown",
            action: "mentioned you in a thread",
            time: "1h ago",
            badge: null,
          },
          {
            initials: "MK",
            name: "Mike Kim",
            action: "sent you a payment",
            time: "3h ago",
            badge: null,
          },
        ].map((item) => (
          <div key={item.name} className="flex items-start gap-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="text-xs">
                {item.initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-0.5">
              <p className="text-sm">
                <span className="font-medium">{item.name}</span>{" "}
                {item.action}
              </p>
              <p className="text-xs text-muted-foreground">{item.time}</p>
            </div>
            {item.badge && <Badge variant="secondary">{item.badge}</Badge>}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function CompositeSection() {
  return (
    <ShowcaseSection title="Composite Examples">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <LoginCardExample />
        <SettingsPanelExample />
        <NotificationCardExample />
      </div>
    </ShowcaseSection>
  );
}

export function ComponentShowcase() {
  return (
    <TooltipProvider>
      <Toaster />
      <div className="mx-auto max-w-5xl space-y-10 p-8">
        <ButtonsSection />
        <FormControlsSection />
        <DataDisplaySection />
        <FeedbackSection />
        <OverlaySection />
        <NavigationSection />
        <CompositeSection />
      </div>
    </TooltipProvider>
  );
}
