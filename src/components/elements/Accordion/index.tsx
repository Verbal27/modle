import { Box } from 'rebass';
import * as React from 'react';
import {
  Chrome,
  Nav,
  NavItem,
  NavItemText,
  CollapsibleSubNavItem,
  SubNavItem,
  SubNavItemText
} from '@zendeskgarden/react-chrome';
import '@zendeskgarden/react-chrome/dist/styles.css';

const AccordionComponent = props => {
  return (
    <Chrome>
      <Nav expanded>
        <NavItem>
          <NavItemText>default</NavItemText>
        </NavItem>
        <NavItem focused>
          <NavItemText>focused</NavItemText>
        </NavItem>
        <NavItem hovered>
          <NavItemText>hovered</NavItemText>
        </NavItem>
        <NavItem current>
          <CollapsibleSubNavItem
            header="Collapsible Item"
            // expanded={state.showCollapsed}
            // onChange={showCollapsed => setState({ showCollapsed })}
          >
            <SubNavItem
              // current={state.currentSubnavItem === 'collapsed-item-1'}
              // onClick={() => setState({ currentSubnavItem: 'collapsed-item-1' })}
              href="#/"
            >
              <SubNavItemText>Item 1</SubNavItemText>
            </SubNavItem>
            <SubNavItem
              // current={state.currentSubnavItem === 'collapsed-item-2'}
              // onClick={() => setState({ currentSubnavItem: 'collapsed-item-2' })}
              href="#/"
            >
              <SubNavItemText>Item 2</SubNavItemText>
            </SubNavItem>
            <SubNavItem
              // current={state.currentSubnavItem === 'collapsed-item-3'}
              // onClick={() => setState({ currentSubnavItem: 'collapsed-item-3' })}
              href="#/"
            >
              <SubNavItemText>Item 3</SubNavItemText>
            </SubNavItem>
          </CollapsibleSubNavItem>
        </NavItem>
      </Nav>
    </Chrome>

    // <CollapsibleSubNavItem><span>re</span></CollapsibleSubNavItem>
    // <CollapsibleSubNavItem
    //   header="Collapsible Item"
    //   // expanded={state.showCollapsed}
    //   // onChange={showCollapsed => props.setState({ showCollapsed })}
    // >
    //   {/* <SubNavItem
    //     current={state.currentSubnavItem === 'collapsed-item-1'}
    //     // onClick={() => props.setState({ currentSubnavItem: 'collapsed-item-1' })}
    //     // href="#/"
    //   >
    //     <SubNavItemText>Item 1</SubNavItemText>
    //   </SubNavItem>
    //   <SubNavItem
    //     current={state.currentSubnavItem === 'collapsed-item-2'}
    //     // onClick={() => props.setState({ currentSubnavItem: 'collapsed-item-2' })}
    //     // href="#/"
    //   >
    //     <SubNavItemText>Item 2</SubNavItemText>
    //   </SubNavItem>
    //   <SubNavItem
    //     current={state.currentSubnavItem === 'collapsed-item-3'}
    //     // onClick={() => props.setState({ currentSubnavItem: 'collapsed-item-3' })}
    //     // href="#/"
    //   >
    //     <SubNavItemText>Item 3</SubNavItemText>
    //   </SubNavItem> */}
    // </CollapsibleSubNavItem>
  );
};

export default AccordionComponent;
