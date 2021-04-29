import React from "react";

interface SidebarState {
	isSidebarOpened: boolean;
}

interface SidebarActions {
	type: "TOGGLE_SIDEBAR";
}

interface ContextProps {
	sidebarState: SidebarState;
	sidebarDispatch: React.Dispatch<SidebarActions>;
}

interface MyProps {}

var LayoutStateContext = React.createContext({} as ContextProps);

function layoutReducer(state: SidebarState, action: SidebarActions) {
	switch (action.type) {
		case "TOGGLE_SIDEBAR":
			return { ...state, isSidebarOpened: !state.isSidebarOpened };
		default: {
			throw new Error(`Unhandled action type: ${action.type}`);
		}
	}
}

function LayoutProvider(props: React.PropsWithChildren<MyProps>) {
	var [sidebarState, sidebarDispatch] = React.useReducer(layoutReducer, {
		isSidebarOpened: true
	});

	const value = { sidebarState, sidebarDispatch };
	return (
		<LayoutStateContext.Provider value={value}>
			{props.children}
		</LayoutStateContext.Provider>
	);
}

function useLayoutState() {
	var context = React.useContext(LayoutStateContext);
	if (context === undefined) {
		throw new Error("useLayoutState must be used within a LayoutProvider");
	}
	return context;
}

export { LayoutProvider, useLayoutState, toggleSidebar };

// ###########################################################
function toggleSidebar(dispatch: React.Dispatch<SidebarActions>) {
	dispatch({
		type: "TOGGLE_SIDEBAR"
	});
}
