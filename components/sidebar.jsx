'use client'
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';

const sidebar = () => {
  return (
      <SimpleTreeView>
        <TreeItem itemId="1" label="Fruits">
          <TreeItem itemId="1-1" label="Apple" />
          <TreeItem itemId="1-2" label="Banana" />
          <TreeItem itemId="1-3" label="Orange" />
          <TreeItem itemId="1-4" label="Strawberry" />
        </TreeItem>
        <TreeItem itemId="2" label="Vegetables">
          <TreeItem itemId="2-1" label="Carrot" />
          <TreeItem itemId="2-2" label="Broccoli" />
          <TreeItem itemId="2-3" label="Tomato" />
          <TreeItem itemId="2-4" label="Spinach" />
        </TreeItem>
      </SimpleTreeView>
  )
}

export default sidebar