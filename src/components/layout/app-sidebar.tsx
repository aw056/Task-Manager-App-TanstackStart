import { Link } from "@tanstack/react-router";
import { ClipboardList, Home } from "lucide-react";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "../ui/sidebar";

const menuItem = [
	{
		name: "Dashboard",
		url: "/",
		icon: Home,
	},
	{
		name: "Task",
		url: "/task",
		icon: ClipboardList,
	},
];

export default function AppSidebar() {
	return (
		<Sidebar variant="inset">
			<SidebarHeader className="p-4">
				<span className="text-2xl font-semibold">Menu</span>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarMenu>
						{menuItem.map((item) => (
							<SidebarMenuItem key={item.name}>
								<SidebarMenuButton asChild>
									<Link to={item.url}>
										<item.icon />
										<span>{item.name}</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
						))}
					</SidebarMenu>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter />
		</Sidebar>
	);
}
