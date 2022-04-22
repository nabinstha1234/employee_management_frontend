import React, { Component } from 'react';

type Props = {
  children: React.ReactNode;
  FallbackComponent: React.ComponentType<any>;
};

type State = {
  hasError: boolean;
};

export class ReactErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <>{this.props.FallbackComponent}</>;
    }

    return <>{this.props.children}</>;
  }
}
