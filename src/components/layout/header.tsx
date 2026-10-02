import { useIsMobile } from "#/hooks/use-mobile";
import { SidebarTrigger } from "../ui/sidebar";

export default function Header() {
	const isMobile = useIsMobile();

	return isMobile ? (
		<div className="flex justify-between items-center border-b pb-1">
			<div className="">
				<span>Dashboard</span>
			</div>
			<div>
				<SidebarTrigger />
			</div>
		</div>
	) : (
		<div className="flex justify-between items-center border-b pb-1">
			<div>
				<SidebarTrigger />
			</div>
		</div>
	);
}
