import { GitHubBanner, Refine } from "@refinedev/core";
import {
    notificationProvider,
    ThemedLayoutV2,
    ErrorComponent,
    RefineThemes,
} from "@refinedev/antd";
import routerProvider, {
    NavigateToResource,
    UnsavedChangesNotifier,
    DocumentTitleHandler,
} from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { ConfigProvider } from "antd";

import "@refinedev/antd/dist/reset.css";

import dataProvider from "./rest-data-provider";
import { PostList } from "./pages/posts";
import { UserList } from "./pages/users";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <GitHubBanner />
            <ConfigProvider theme={RefineThemes.Blue}>
                <Refine
                    routerProvider={routerProvider}
                    dataProvider={dataProvider}
                    notificationProvider={notificationProvider}
                    resources={[
                        {
                            name: "posts",
                            list: "/posts",
                            meta: {
                                role: "admin",
                                order: 1,
                            },
                        },
                        {
                            name: "users",
                            list: "/users",
                            meta: {
                                role: "editor",
                                order: 2,
                            },
                        },
                    ]}
                    options={{
                        warnWhenUnsavedChanges: true,
                        syncWithLocation: true,
                    }}
                >
                    <Routes>
                        <Route
                            element={
                                <ThemedLayoutV2>
                                    <Outlet />
                                </ThemedLayoutV2>
                            }
                        >
                            <Route
                                index
                                element={
                                    <NavigateToResource resource="posts" />
                                }
                            />

                            <Route path="/posts" element={<PostList />} />
                            <Route path="/users" element={<UserList />} />

                            <Route path="*" element={<ErrorComponent />} />
                        </Route>
                    </Routes>
                    <UnsavedChangesNotifier />
                    <DocumentTitleHandler />
                </Refine>
            </ConfigProvider>
        </BrowserRouter>
    );
};

export default App;
