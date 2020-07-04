import React, { FC } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state: any) => ({

});

const mapDispatchToProps = (dispatch: any) => ({

});

const container: FC<{}> = () => {
  const x = 2;

  return (
    <div>
      <h2>Inbox</h2>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(container);
