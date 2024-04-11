import {
    AccountBar,
    Button,
    ButtonLogo,
    Header,
    HeaderCenter,
    HeaderLeft,
    HeaderRight,
    Menu2,
    iconAccount,
    iconStyle, iconSettings, HeaderSpace
} from "../../../NovaX";
import {ImgBase64} from "../../index";

// Modul Header.
const ModulHeader = ({
                         userData,
                         design = 2,
                         src,
                         navAdmin = false,
                         navUser = true,
                         menuLeft = true,
                         menuRight = true,
                         logIn,
                         isLogIn = false,
                         logOut,
                         ...rest
                     }) =>
{
    const path = window.location.pathname;
    const currentLocation  = path.split('/')[1];

    // Return.
    return (
        <Header {...rest} design={design} src={src}>
            {menuLeft === true && <HeaderLeft>
                {/* Logo. */}
                <ButtonLogo title={"TTRPG"} src={"./Grafiki/Logo.png"} href={"/"}/>

                {(navUser === true || navAdmin === true) && <HeaderSpace/>}

                {/* Nawigacja Użytkownika. */}
                {navUser === true && <>
                    <Menu2 tag={"nav"}>
                        <li>
                            <Button title={"Pokoje"} width={2} href={"/"}/>
                        </li>
                        {/*<li>*/}
                        {/*    <a href={""}>*/}
                        {/*        <Button title={"O Nas"} width={2}/>*/}
                        {/*    </a>*/}
                        {/*    <Menu2>*/}
                        {/*        <li>*/}
                        {/*            <a href={""}>*/}
                        {/*                <Button title={"Wiadomości"} style={{width: "100%"}}/>*/}
                        {/*            </a>*/}
                        {/*        </li>*/}
                        {/*        <li>*/}
                        {/*            <a href={""}>*/}
                        {/*                <Button title={"Regulamin"} style={{width: "100%"}}/>*/}
                        {/*            </a>*/}
                        {/*        </li>*/}
                        {/*    </Menu2>*/}
                        {/*</li>*/}
                    </Menu2>
                </>}

                {/* Nawigacja Admina. */}
                {navAdmin === true && <>
                    <Menu2 tag={"nav"}>
                        <li>
                            <Button title={"Pokoje"} width={2} href={"/"}/>
                        </li>
                        <li>
                            <Button title={"Użytkownicy"} width={2} href={""}/>
                        </li>
                    </Menu2>
                </>}
            </HeaderLeft>}


            {/* Nawigacja Konta. */}
            {menuRight === true && <HeaderRight>
                {/*<Button src={iconStyle} active={false}/>*/}
                {isLogIn === true ? (
                    <Menu2>
                        <li>
                            <AccountBar design={1}
                                        width={2}
                                        title={userData.nickname}
                                        subTitle={userData.admin === true && "[Admin]"}
                                        src={ImgBase64(userData.imageExtension, userData.avatar)}
                            >
                            </AccountBar>
                            <Menu2>
                                <li>
                                    <Button title={"Ustawienia"} width={0}
                                            href={currentLocation !== 'UstawieniaKonta' && "/UstawieniaKonta"}
                                            active={currentLocation !== 'UstawieniaKonta'}/>
                                </li>
                                {userData.admin === true && <li>
                                    <Button title={"Panel"} width={0}
                                            href={currentLocation !== 'PanelAdmina' && "/PanelAdmina"}
                                            active={currentLocation !== 'PanelAdmina' && "/PanelAdmina"}/>
                                </li>}
                                <li>
                                    <Button title={"Wyloguj Się"} onClick={logOut} width={0}/>
                                </li>
                            </Menu2>
                        </li>
                    </Menu2>
                ) : (
                    <Button title={"Zaloguj Się"} src={iconAccount} onClick={logIn} width={1}/>
                )}
            </HeaderRight>}
        </Header>
    );
}

export default ModulHeader;