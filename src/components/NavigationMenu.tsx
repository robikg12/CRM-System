import { Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom'; //Про useLocation загуглил
import type { MenuProps } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

interface Props {
    isAdmin?: boolean;
    isModerator?: boolean;
};

const NavigationMenu: React.FC<Props> = ({ isAdmin, isModerator }) => {

    const menuItems: MenuItem[] = [
        {
            key: '/',
            label: 'Список задач'
        },
        {
            key: '/profile',
            label: 'Профиль'
        }
    ];

    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;

    const onSelectMenuItem: MenuProps['onClick'] = (e) => {
        navigate(e.key);
    };


    if (isAdmin || isModerator) {
        menuItems.push({
            key: '/users',
            label: 'Пользователи'
        });
    }

    const NavigationMenu = <Menu onClick={onSelectMenuItem}
        selectedKeys={[currentPath]}
        mode="vertical" items={menuItems}
    />

    return <>
        {NavigationMenu}
    </>
}

export default NavigationMenu;