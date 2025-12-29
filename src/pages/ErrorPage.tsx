import NavigationMenu from "../components/NavigationMenu";
import { Flex } from "antd";

const ErrorPage: React.FC = () => {
    return <Flex style={{ minHeight: "100vh" }}>
        <NavigationMenu />
        <h1 style={{ marginLeft: "100px" }}>
            Страница не найдена =/ Произошла какая-то ошибка
        </h1>
    </Flex>
}
export default ErrorPage;