"use client";

import { useId } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton         from '@mui/material/IconButton';
import { AppDialogProps } from "@/types/allTypes";

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
      slotProps={{
        paper: {
          sx: {
            borderRadius: 6,
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
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
      ) : null}

      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          py: 3,
        }}
      >
        {description ? (
          <DialogContentText sx={{ textAlign: 'center' }}>{description}</DialogContentText>
        ) : null}
        {children}
      </DialogContent>

      {actions ? (
        <DialogActions
          sx={{
            justifyContent: 'center',
            gap: 2,
            pb: 3,
          }}
        >
          {actions}
        </DialogActions>
      ) : null}
    </Dialog>
  );
}
