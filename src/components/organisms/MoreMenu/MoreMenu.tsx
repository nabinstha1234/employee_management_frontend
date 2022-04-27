import { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';

import { ReactIcon } from 'components/molecules';
import config from "config";

type Props = {
    id:number;
    onClick:Function;
};

const MoreMenu = ({id, onClick}: Props) => {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const onClickItem=(id:number, type:string)=>{
      setIsOpen(false)
      onClick(id,type)
  }

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <ReactIcon icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem sx={{ color: 'text.secondary' }} onClick={()=> onClickItem(id, config.menuType.delete)} >
          <ListItemIcon>
            <ReactIcon icon="eva:trash-2-outline" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem component={RouterLink} to="#" sx={{ color: 'text.secondary' }} onClick={()=> onClickItem(id, config.menuType.edit)} >
          <ListItemIcon>
            <ReactIcon icon="eva:edit-fill" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Edit" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </>
  );
};

export default MoreMenu;
