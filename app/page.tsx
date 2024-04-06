import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { YearlyUsage } from "@/components/overview";
import { Search } from "@/components/search";
import { UserNav } from "@/components/user-nav";
import { ModeToggle } from "@/components/toggler";

export const metadata: Metadata = {
  title: "EnergyIQ",
  description: "Example dashboard app built using the components.",
};

export default function DashboardPage() {
  return (
    <>
      <div className="flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-8">
            <h2 className="md:text-3xl text-2xl dark:font-extralight tracking-tight dark:text-emerald-300 text-emerald-600 font-light">
              EnergyIQ
            </h2>
            <div className="ml-auto flex items-center space-x-4">
              <Search />
              <UserNav />
              <ModeToggle />
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="reports" disabled>
                Reports
              </TabsTrigger>
              <TabsTrigger value="notifications" disabled>
                Notifications
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 py-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Voltage
                    </CardTitle>

                    <svg
                      fill="#5dbb6c"
                      height="32px"
                      width="32px"
                      version="1.1"
                      id="Capa_1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 194.805 194.805"
                      stroke="#5dbb6c"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path d="M169.77,185.069H25.035c-9.036,0-17.128-4.672-21.646-12.498c-4.518-7.826-4.518-17.169,0-24.995L75.756,22.233 c4.518-7.826,12.61-12.498,21.646-12.498c9.035,0,17.128,4.672,21.646,12.498l72.367,125.344c4.519,7.825,4.519,17.169,0.001,24.995 C186.898,180.397,178.806,185.069,169.77,185.069z M97.403,14.735c-7.229,0-13.702,3.737-17.316,9.998L7.718,150.077 c-3.614,6.26-3.614,13.735,0,19.995s10.088,9.998,17.316,9.998H169.77c7.229,0,13.702-3.737,17.316-9.998 c3.614-6.26,3.613-13.734-0.001-19.995L114.718,24.733C111.104,18.473,104.63,14.735,97.403,14.735z M165.882,175.299H28.922 c-6.38,0-12.094-3.299-15.284-8.824c-3.189-5.525-3.189-12.123,0-17.648l68.48-118.611c3.189-5.525,8.903-8.824,15.283-8.824 s12.094,3.299,15.284,8.824l68.48,118.611c3.19,5.526,3.189,12.123,0,17.648C177.976,172,172.262,175.299,165.882,175.299z M97.402,26.392c-4.572,0-8.667,2.364-10.953,6.324l-68.48,118.611c-2.286,3.96-2.286,8.688,0,12.648 c2.287,3.959,6.382,6.324,10.954,6.324h136.96c4.572,0,8.667-2.364,10.954-6.324c2.286-3.96,2.286-8.688,0-12.648l-68.48-118.611 C106.07,28.756,101.974,26.392,97.402,26.392z M76.261,161.378c-0.378,0-0.76-0.085-1.116-0.264 c-1.116-0.557-1.65-1.852-1.252-3.034l14.685-43.621H68.83c-0.857,0-1.656-0.44-2.114-1.165c-0.458-0.726-0.512-1.635-0.143-2.41 L89.8,62.106c0.414-0.871,1.293-1.425,2.257-1.425h16.724c0.85,0,1.641,0.432,2.102,1.146c0.46,0.714,0.526,1.613,0.176,2.387 L96.864,95.522h21.208c0.929,0,1.78,0.514,2.212,1.336c0.433,0.821,0.374,1.814-0.151,2.58l-41.81,60.855 C77.842,160.992,77.062,161.378,76.261,161.378z M72.79,109.458h19.268c0.805,0,1.561,0.388,2.03,1.041 c0.47,0.654,0.596,1.494,0.339,2.257l-10.078,29.936l28.973-42.17H92.986c-0.85,0-1.641-0.432-2.102-1.146 c-0.46-0.714-0.526-1.613-0.176-2.387l14.194-31.309H93.635L72.79,109.458z"></path>{" "}
                      </g>
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">0 V</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Current Draw
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">0 A</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Power Draw
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <rect width="20" height="14" x="2" y="5" rx="2" />
                      <path d="M2 10h20" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">0 W</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Frequency
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">0 Hz</div>
                  </CardContent>
                </Card>
              </div>
              <Card className="col-span-12">
                <CardHeader>
                  <CardTitle>Monthly Usage (power)</CardTitle>
                </CardHeader>
                <CardContent>
                  <YearlyUsage />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
