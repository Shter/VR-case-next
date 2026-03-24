'use client';

import { useId } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { CloseIconGlyph } from '@/components/client/icons';
import { AppDialogProps } from '@/types/allTypes';

export function AppDialog({
  open,
  onCloseAction,
  title,
  description,
  children,
  actions,
  titleId,
  maxWidth = 'sm',
  fullWidth = true,
  closeLabel = 'Cerrar',
}: AppDialogProps) {
  const autoTitleId = useId();
  const resolvedTitleId = title ? titleId ?? `${autoTitleId}-title` : undefined;

  return (
    <Dialog
      open={open}
      onClose={onCloseAction}
      aria-labelledby={resolvedTitleId}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      keepMounted
      slotProps={{
        transition: {
          timeout: { appear: 0, enter: 0, exit: 150 }
        },
        paper: {
          sx: {
            borderRadius: '1.5rem',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            color: '#f4f0ff',
            boxShadow: '0 30px 80px rgba(0, 0, 0, 0.55)',
            backdropFilter: 'blur(18px)',
            transition: 'none'
          },
        },
      }}
    >
      {title || onCloseAction ? (
        <DialogTitle
          id={resolvedTitleId}
          sx={{
            textAlign: 'center',
            fontWeight: 600,
            position: 'relative',
            pr: 7,
            pl: 7,
            pt: 4,
            pb: 2,
            color: '#f4f0ff'
          }}
        >
          {title}
          <IconButton
            aria-label={closeLabel}
            onClick={onCloseAction}
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              color: '#f4f0ff'
            }}
          >
            <CloseIconGlyph width={24} height={24} />
          </IconButton>
        </DialogTitle>
      ) : null}

      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          py: 3,
          color: '#f4f0ff'
        }}
      >
        {description ? (
          <DialogContentText sx={{ textAlign: 'center', color: 'rgba(244, 240, 255, 0.75)' }}>
            {description}
          </DialogContentText>
        ) : null}
        {children}
      </DialogContent>

      {actions ? (
        <DialogActions
          sx={{
            justifyContent: 'center',
            gap: 2,
            pb: 3,
            color: '#f4f0ff'
          }}
        >
          {actions}
        </DialogActions>
      ) : null}
    </Dialog>
  );
}
