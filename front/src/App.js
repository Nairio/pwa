import React from 'react';
import './App.css';
import Index from "./modules/pages/index";

import Info from "./modules/pages/info/info";
import Quiz from "./modules/pages/quiz/quiz";
import Card from "./modules/pages/card/card";
import VirtualListPage from "./modules/pages/virtual-list/virtual-list";
import SearchPage from "./modules/pages/search/search";
import SettingsPage from "./modules/pages/settings/settings";
import FullScreenPage from "./modules/pages/fullscreen/fullscreen";

import Divider from "@material-ui/core/Divider";

import InfoIcon from '@material-ui/icons/Info';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import ToysIcon from '@material-ui/icons/Toys';

import VerticalAlignTopIcon from '@material-ui/icons/VerticalAlignTop';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import SearchIcon from '@material-ui/icons/Search';
import MoreVertIcon from "@material-ui/icons/MoreVert";
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import SystemUpdateIcon from '@material-ui/icons/SystemUpdate';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ListAltIcon from '@material-ui/icons/ListAlt';

import Slide1 from "./modules/pages/slides/slide1";
import Slide2 from "./modules/pages/slides/slide2";
import Slide3 from "./modules/pages/slides/slide3";
import {SwipeableBottom, SwipeableTop} from "./modules/templates/swipeable";
import {storage} from "./modules/features/localstorage";

import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Account from "./modules/pages/account/account";
import {Page, PWA, Slide} from "./modules/templates/pwa";
import Hslide from "./modules/pages/slides/hslide";
import Change from "./modules/pages/account/change";
import Logout from "./modules/pages/account/logout";
import Login from "./modules/pages/account/login";
import Register from "./modules/pages/account/register";
import Forgot from "./modules/pages/account/forgot";
import Fab from "./modules/pages/fab/fab";
import FormPage from "./modules/pages/form/form";

//storage("auth", {name: "Наири", email: "nairik@mail.ru"});
//storage("auth", false);

const {name, email} = storage("auth");

class App extends React.Component {
    render() {
        return (
            <PWA icon={require("./icon.jpg")} title="Progressive" subtitle="PWA" server="https://us-central1--pwa.cloudfunctions.net/account">
                <Page title="Главная" path="/" component={Index}/>

                {email ? (
                    <Page title={`${name} (${email})`} icon={<AccountBoxIcon/>} path="/account/" component={Account}>
                        <SwipeableTop>
                            <Slide auth={{name, email}} title="Выйти" component={Logout}/>
                            <Slide auth={{name, email}} title="Сменить пароль" component={Change}/>
                        </SwipeableTop>
                    </Page>
                ) : (
                    <Page title={"Вход"} icon={<ExitToAppIcon/>} path="/account/" component={Account}>
                        <SwipeableTop>
                            <Slide title="Войти" component={Login}/>
                            <Slide title="Зарегистрироваться" component={Register}/>
                            <Slide title="Восстановить пароль" component={Forgot}/>
                        </SwipeableTop>
                    </Page>
                )}

                <Divider/>
                <Page title="Верхний слайдер" icon={<VerticalAlignTopIcon/>} path="/top-slider/" component={Hslide}>
                    <SwipeableTop>
                        <Slide title="Первый" icon={<PermIdentityIcon/>} component={Slide1}/>
                        <Slide title="Второй" icon={<CloudDownloadIcon/>} component={Slide2}/>
                        <Slide title="Третий" icon={<SystemUpdateIcon/>} component={Slide3}/>
                    </SwipeableTop>
                </Page>
                <Page title="Нижний слайдер" icon={<VerticalAlignTopIcon/>} path="/bottom-slider/" component={Hslide}>
                    <SwipeableBottom>
                        <Slide title="Первый" icon={<PermIdentityIcon/>} component={Slide1}/>
                        <Slide title="Второй" icon={<CloudDownloadIcon/>} component={Slide2}/>
                        <Slide title="Третий" icon={<SystemUpdateIcon/>} component={Slide3}/>
                    </SwipeableBottom>
                </Page>
                <Divider/>
                <Page title="Форма" icon={<ListAltIcon/>} path="/form/" component={FormPage}/>
                <Page title="Поиск" icon={<SearchIcon/>} path="/search/" component={SearchPage}/>
                <Page title="Настройки" icon={<MoreVertIcon/>} path="/settings/" component={SettingsPage}/>
                <Page title="Фуллскрин" icon={<FullscreenIcon/>} path="/fullscreen/" component={FullScreenPage}/>
                <Page title="Карточка" icon={<CardGiftcardIcon/>} path="/card/" component={Card}/>
                <Page title="Фаб" icon={<AddCircleOutlineIcon/>} path="/fab/" component={Fab}/>
                <Page title="Виртуальный список" icon={<FormatListBulletedIcon/>} path="/virtual-list/" component={VirtualListPage}/>
                <Page title="Квиз" icon={<ToysIcon/>} path="/quiz/" component={Quiz}/>
                <Page title="Информация" icon={<InfoIcon/>} path="/info/" component={Info}/>
            </PWA>
        )
    }
}


export default App;
