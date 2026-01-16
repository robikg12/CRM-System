import { Outlet } from "react-router-dom";
import { Flex } from "antd";
import NavigationMenu from "../components/NavigationMenu";

const RootLayout: React.FC = () => {
    // Понимаю, что здесь не нужно ставить gap, т.к когда будет что-то на других страницах кроме туду,
    // то будет огромное расстояние между менюшкой, но для стиля в данный момент добавил.
    return <Flex style={{ minHeight: "100vh" }}>
        <NavigationMenu />
        <Outlet />
    </Flex >
}

export default RootLayout;