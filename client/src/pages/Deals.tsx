import { Link, useLocation } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "../components/ui/breadcrumb";
import AddDeals from "../components/deals/AddDeals";
import { DealsTable } from "../components/deals/DealsTable";


export default function Deals() {
  const currentPath = useLocation();
  const path = currentPath.pathname.slice(1);
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
              <AddDeals />
            </div>
          </div>
        </div>
        <div>
          <DealsTable />
        </div>
      </div>
    </>
  )
}
