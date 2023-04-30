import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core';

import { connectors, connectorLocalStorageKey, getConnector } from './utils/connectors';
import { setupNetwork } from './utils/wallet';
import { useInactiveListener } from "./hooks/useInactiveListener";
import { useAxios } from "./hooks/useAxios";
import { getErrorMessage } from "./utils/ethereum";

import { getUser, loginUser, useAuthDispatch, useAuthState, logout } from "./context/authContext";
import Routing from "./router/routing";
import { IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function App() {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState("");
    const handleCloseDialog = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpenSnackbar(false);
    };
    useAxios();
    const { account, library, activate, active, connector } = useWeb3React();
    // useEffect(()=>{
    //     console.log('account app', account)
    // },[account])
    
    const [activatingConnector, setActivatingConnector] = React.useState(undefined);
    const { activateError } = useInactiveListener(!!activatingConnector)
    const connectAccount = () => {
        let entry = connectors[0];
        connectToProvider(entry.connectorId);
        window.localStorage.setItem(connectorLocalStorageKey, entry.key);
        if (activateError) {
            const errorMsg = getErrorMessage(activateError);
            setSnackBarMessage(errorMsg);
            setOpenSnackbar(true);
        }
    }
    const connectToProvider = (connector) => {
        let _tried = false;
        let _triedError = undefined;
        const connectorKey = window.localStorage.getItem(connectorLocalStorageKey);
        if (connectorKey && connectorKey !== "") {
            const currentConnector = getConnector(connectorKey)
            if (connectorKey === "injectedConnector") {
                currentConnector.isAuthorized().then((isAuthorized) => {
                    if (isAuthorized) {
                        activate(currentConnector, undefined, true).catch((error) => {
                            if (error instanceof UnsupportedChainIdError) {
                                setupNetwork().then((hasSetup) => {
                                    if (hasSetup) activate(currentConnector);
                                })
                            }
                            _triedError = error;
                            _tried = true;
                        })
                    } else _tried = true;
                })
            } else {
                activate(currentConnector);
                _tried = true;
            }
        }
        if (_tried) {
            const errorMsg = getErrorMessage(_triedError);
            setSnackBarMessage(errorMsg);
            setOpenSnackbar(true);
        }
        activate(connector)
    }
    useEffect(() => {
        const connectorKey = window.localStorage.getItem(connectorLocalStorageKey);
        if (connectorKey && connectorKey !== "") {
            const currentConnector = getConnector(connectorKey)
            if (connectorKey === "injectedConnector") {
                currentConnector.isAuthorized().then((isAuthorized) => {
                    if (isAuthorized) activate(currentConnector)
                })
            } else {
                activate(currentConnector);
            }
        } else if (activatingConnector && activatingConnector === connector) {
            setActivatingConnector(undefined)
        }
    }, [])

    const dispatch = useAuthDispatch();
    const { user, token } = useAuthState();
    const login = async () => {
        if (!account || !library) {
            return;
        }
        if (!user) {
            await getUser(dispatch, account);
        }
        if (!user?.nonce || token) {
            return;
        }
        loginUser(dispatch, account, user?.nonce, library.getSigner())
    }
    const logoutUser = async () => {
        logout(dispatch);
    }
    useEffect(() => {
        if (active && account) {
            getUser(dispatch, account)
        }
    }, [active, account]);
    return (
        <>
            <Router>
                <Routing  connectAccount={connectAccount} getUser={getUser} user={user} login={login} logout={logoutUser} />
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center'
                    }}
                    open={openSnackbar}
                    autoHideDuration={3000}
                    onClose={handleCloseDialog}
                    message={snackBarMessage}
                    action={
                        <React.Fragment>
                            <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseDialog}>
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </React.Fragment>
                    }
                />
            </Router>
        </>
    )
}

export default App;