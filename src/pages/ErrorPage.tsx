import NavigationMenu from "../components/NavigationMenu";
import { Flex } from "antd";

const ErrorPage: React.FC = () => {
    return <Flex gap={100} style={{ minHeight: "100vh" }}>
        <NavigationMenu />
        <h1>Страница не найдена =/ Произошла какая-то ошибка</h1>
    </Flex>
}
export default ErrorPage;