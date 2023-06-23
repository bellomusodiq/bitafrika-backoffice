import React from "react";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";

const items: MenuProps["items"] = [
  {
    label: <a href="https://www.antgroup.com">1st menu item</a>,
    key: "0",
  },
  {
    label: <a href="https://www.aliyun.com">2nd menu item</a>,
    key: "1",
  },
  {
    type: "divider",
  },
  {
    label: "3rd menu item",
    key: "3",
  },
];

const DropModal: React.FC<{
  title: JSX.Element;
  children: JSX.Element;
  open: boolean;
  onToggle: (value: boolean) => void;
}> = ({ children, title, open, onToggle }) => (
  <Dropdown
    menu={{ items }}
    dropdownRender={() => children}
    trigger={["click"]}
    open={open}
    onOpenChange={onToggle}
  >
    {title}
  </Dropdown>
);

export default DropModal;
