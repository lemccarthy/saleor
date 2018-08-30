import { parse as parseQs } from "qs";
import * as React from "react";
import { Route, RouteComponentProps, Switch } from "react-router-dom";

import MenuDetailsComponent from "./views/MenuDetails";
import MenuListComponent from "./views/MenuList";

const MenuList: React.StatelessComponent<RouteComponentProps<{}>> = ({
  location
}) => {
  const qs = parseQs(location.search.substr(1));
  const params = {
    after: qs.after,
    before: qs.before
  };
  return <MenuListComponent params={params} />;
};

const MenuDetails: React.StatelessComponent<
  RouteComponentProps<{ id: string }>
> = ({ location, match }) => {
  const qs = parseQs(location.search.substr(1));
  const params = {
    after: qs.after,
    before: qs.before
  };
  return <MenuDetailsComponent id={match.params.id} params={params} />;
};

export const MenuRouter: React.StatelessComponent<RouteComponentProps<any>> = ({
  match
}) => (
  <Switch>
    <Route exact path={match.url} component={MenuList} />
    <Route exact path={`${match.url}/:id/`} component={MenuDetails} />
  </Switch>
);

export interface Menu {
  id: string;
  name: string;
}

export interface MenuItem {
  id: string;
  name: string;
  url: string;
}

export const menuListUrl = "/menus/";
export const menuAddUrl = "/menus/add/";
export const menuUrl = (id: string) => `/menus/${id}/`;
export const menuItemAddUrl = "/menus/item/add/";
export const menuItemUrl = (id: string) => `/menus/item/${id}/`;

export default MenuRouter;