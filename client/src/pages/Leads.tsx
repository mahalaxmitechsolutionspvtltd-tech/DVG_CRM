import { useLocation, Link } from "react-router-dom"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "../components/ui/breadcrumb";

import { Separator } from "../components/ui/separator";
import { LeadsTable } from "../components/LeadsTable";
import AddLeads from "../components/AddLeads";

export default function Leads() {
    const currentPath = useLocation();
    const path = currentPath.pathname.slice(1);
    console.log(path);

    return (
        <>
            <div>
                <div>
                    <div className=" md:flex lg:flex xl:flex 2xl:flex justify-between">
                        <Breadcrumb className="my-auto">
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink asChild />
                                    <Link to={"/"} className=" text-blue-400">Dashboard</Link>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbLink asChild />
                                    <Link to={"#"} className=" text-gray-400">{path}</Link>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>

                        {/* Add Leads btn */}
                        <div className="my-auto">
                            <AddLeads/>
                        </div>
                    </div>
                </div>
                <Separator className="mt-5" />
                <div>
                    <LeadsTable/>
                </div>

            </div >
        </>
    )
}
