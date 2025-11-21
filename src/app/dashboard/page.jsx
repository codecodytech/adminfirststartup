import Protected from "@/components/protected";
export default function Page() {
    return (
        <>
            <Protected>
                <div className="w-full">

                    {/* Page Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-zinc-800 dark:text-white">
                            Dashboard
                        </h1>
                        <p className="text-zinc-500 dark:text-zinc-400 mt-1">
                            Welcome back! Here's an overview of your platform.
                        </p>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                        <div className="p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-md border border-zinc-200 dark:border-zinc-800">
                            <h2 className="text-sm text-zinc-500">Total Users</h2>
                            <p className="text-3xl font-bold mt-2">1,248</p>
                        </div>

                        <div className="p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-md border border-zinc-200 dark:border-zinc-800">
                            <h2 className="text-sm text-zinc-500">Active Sessions</h2>
                            <p className="text-3xl font-bold mt-2">342</p>
                        </div>

                        <div className="p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-md border border-zinc-200 dark:border-zinc-800">
                            <h2 className="text-sm text-zinc-500">Monthly Revenue</h2>
                            <p className="text-3xl font-bold mt-2">$12,430</p>
                        </div>

                        <div className="p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-md border border-zinc-200 dark:border-zinc-800">
                            <h2 className="text-sm text-zinc-500">New Signups</h2>
                            <p className="text-3xl font-bold mt-2">98</p>
                        </div>
                    </div>

                    {/* Two Column Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* Left Side: Recent Activity */}
                        <div className="col-span-2 bg-white dark:bg-zinc-900 rounded-xl shadow-md border border-zinc-200 dark:border-zinc-800 p-6">
                            <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>

                            <ul className="space-y-4">
                                {[1, 2, 3, 4].map((item) => (
                                    <li
                                        key={item}
                                        className="flex items-start gap-3 border-b border-zinc-200 dark:border-zinc-800 pb-3"
                                    >
                                        <div className="w-2 h-2 rounded-full bg-blue-600 mt-2"></div>
                                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                            User <span className="font-semibold text-zinc-800 dark:text-white">john.doe</span> updated profile information.
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Right Side: Notifications */}
                        <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-md border border-zinc-200 dark:border-zinc-800 p-6">
                            <h3 className="text-xl font-semibold mb-4">Notifications</h3>

                            <div className="space-y-4">
                                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                                    <p className="text-sm text-blue-700 dark:text-blue-300">
                                        New system update is available.
                                    </p>
                                </div>

                                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                                    <p className="text-sm text-yellow-700 dark:text-yellow-300">
                                        Scheduled maintenance tonight at 2 AM.
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </Protected>

        </>
    );
}
