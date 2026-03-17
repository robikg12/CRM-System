import { useState, useEffect } from 'react';
import { Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom'; //Про useLocation загуглил
import type { MenuProps } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];


const NavigationMenu: React.FC<{ isAdmin?: boolean, isModerator?: boolean }> = ({ isAdmin, isModerator }) => {

    const [menuItems, setMenuItems] = useState<MenuItem[]>([
        {
            key: '/',
            label: 'Список задач'
        },
        {
            key: '/profile',
            label: 'Профиль'
        }
    ]);

    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;

    const onClick: MenuProps['onClick'] = (e) => {
        navigate(e.key);
    };

    useEffect(() => {
        if (isAdmin || isModerator) {

            for (const item of menuItems) {  //Решил всё-таки сделать через цикл, например вместо  if items.length,
                //на случай если бы вдруг ролей и разделов сайта было бы больше. Чтобы это чётко зависело от роли Админ/Модератор 
                if (item?.key === '/users') {
                    return
                }
            }
            setMenuItems(prevItems => {
                return [...prevItems, {
                    key: '/users',
                    label: 'Пользователи'
                }]
            });
        }
    }, [isAdmin, isModerator]);

    return <>
        <Menu onClick={onClick} selectedKeys={[currentPath]} mode="vertical" items={menuItems} />
    </>
}

export default NavigationMenu;