import { StatusBar } from "expo-status-bar";
import React, { useMemo } from "react";
import { View } from "react-native";

import {
  ScrollHeaderProps,
  ScrollLargeHeaderProps,
  SharedScrollContainerProps,
} from "@codeherence/react-native-header";

import { Header } from "./Header";
import { LargeHeader } from "./LargeHeader";

interface ScrollContainerProps<
  P extends object,
  S extends SharedScrollContainerProps & P,
  T extends React.ComponentType<S> = React.ComponentType<S>,
> {
  /**
   * A component that support headers from `react-native-header`.
   */
  Component?: T;
  children?: React.ReactNode;
  /**
   * The small header component. This is the component that is rendered on top of the scroll view.
   *
   * @param {ScrollHeaderProps} props The props given to the small header component.
   * @returns {React.ReactNode}
   */
  HeaderComponent: React.FC<ScrollHeaderProps>;
  /**
   * The large header component. This is the component that is rendered under the navigation bar.
   *
   * @param {ScrollLargeHeaderProps} props The props given to the large header component.
   * @returns {React.ReactNode}
   */
  LargeHeaderComponent?: React.FC<ScrollLargeHeaderProps>;
}

export function ScrollableWithHeader<
  P extends object,
  S extends SharedScrollContainerProps & P = SharedScrollContainerProps & P,
  T extends React.ComponentType<S> = React.ComponentType<S>,
>({
  Component,
  HeaderComponent,
  LargeHeaderComponent,
  ...props
}: ScrollContainerProps<P, S, T> &
  Omit<
    React.ComponentPropsWithoutRef<T>,
    keyof ScrollContainerProps<P, S, T>
  >) {
  const WrappedHeader = useMemo(
    () => (props: ScrollHeaderProps) => (
      <Header {...props}>
        <HeaderComponent {...props} />
      </Header>
    ),
    [HeaderComponent]
  );
  const WrappedLargeHeader = useMemo(
    () =>
      LargeHeaderComponent
        ? (props: ScrollLargeHeaderProps) => (
            <LargeHeader {...props}>
              <LargeHeaderComponent {...props} />
            </LargeHeader>
          )
        : undefined,
    [LargeHeaderComponent]
  );
  return (
    <View style={{ height: "100%", backgroundColor: "#66BEEF" }}>
      {/** @ts-expect-error */}
      <Component
        HeaderComponent={WrappedHeader}
        LargeHeaderComponent={WrappedLargeHeader}
        disableLargeHeaderFadeAnim
        {...props}
      />

      <StatusBar style="light" translucent />
    </View>
  );
}
