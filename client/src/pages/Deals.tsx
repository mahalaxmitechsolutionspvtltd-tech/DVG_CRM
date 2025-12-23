import { Link, useLocation } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "../components/ui/breadcrumb";
import AddDeals from "../components/deals/AddDeals";
import { DealsTable } from "../components/deals/DealsTable";
import { useState } from "react";
import { toast } from "sonner";


export default function Deals() {
  const currentPath = useLocation();
  const path = currentPath.pathname.slice(1);
  const [refreshKey, setRefreshKey] = useState(false);

  const handleSuccess = (isSuccess: boolean) => {
    if (isSuccess) {
      setRefreshKey((prev: any) => !prev);
      toast.success('New deal created successfully!', {
        style: {
          '--normal-bg': 'light-dark(var(--color-green-600), var(--color-green-400))',
          '--normal-text': 'var(--color-white)',
          '--normal-border': 'light-dark(var(--color-green-600), var(--color-green-400))'
        } as React.CSSProperties
      })
    }
  }


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
              <AddDeals onSuccess={handleSuccess} />
            </div>
          </div>
        </div>
        <div>
          <DealsTable refreshKey={refreshKey} />
        </div>
      </div>
    </>
  )
}
