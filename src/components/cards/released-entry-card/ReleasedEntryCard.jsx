// eslint-disable-next-line no-unused-vars
import React, { Fragment, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import { CopyToClipboard, deleteEntry, ErrorBoundary } from 'utilities';
import {
  ClipboardPopover,
  StyledMuiCardContent,
  StyledMuiCardHeader
} from 'components';
import { withSnackbar } from 'notistack';

const S = {};

S.Card = styled(Card)`
 width: 19rem;
`;

S.IconButton = styled(IconButton)`
  &.s-icon-button {
    padding: 8px 7px 8px 7px;
  }
`;

const ReleasedEntryCard = (props) => {
  const [copied, updateCopied] = useState(false);
  const [anchorEl, updateAnchorEl] = useState(null);

  const { entry, refresh, wrapper } = props;
  const { entryId, content, description } = entry;
  const { shouldRenderCard } = wrapper;

  const handleCloseButtonClick = () => (
    deleteEntry(entry.entryId)
      .then(() => refresh())
  );

  const handleCardClick = event => (
    updateAnchorEl(event.currentTarget)
  );

  return (
    <ErrorBoundary>
      {shouldRenderCard && (
        <>
          {anchorEl && (
            <ClipboardPopover
              trigger={copied}
              anchorEl={anchorEl}
            />
          )}
          <CopyToClipboard
            text={`DESCRIPTION:\n\t${description}\n\nCONTENT:\n\t${content}`}
            onCopy={() => updateCopied(!copied)}
          >
            <S.Card onClick={handleCardClick} id={entryId}>
              <StyledMuiCardHeader
                action={(
                  <S.IconButton
                    className='s-icon-button'
                    onClick={handleCloseButtonClick}
                  >
                    <CloseIcon />
                  </S.IconButton>
                )}
                title={description}
              />
              <StyledMuiCardContent>
                <Typography>
                  {content}
                </Typography>
              </StyledMuiCardContent>
            </S.Card>
          </CopyToClipboard>
        </>
      )}
    </ErrorBoundary>
  );
};

ReleasedEntryCard.propTypes = {
  entry: PropTypes.shape({
    entryId: PropTypes.string,
    description: PropTypes.string,
    content: PropTypes.string,
  }).isRequired,
  refresh: PropTypes.func.isRequired,
  wrapper: PropTypes.objectOf(PropTypes.bool).isRequired,
};

export default withSnackbar(ReleasedEntryCard);
