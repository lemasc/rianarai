import { theme } from "config/nativebase";
import { NativeBaseProvider as Provider, useColorMode } from "native-base";
import { useEffect } from "react";
import { Appearance } from "react-native";

export function NativeBaseProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider theme={theme}>
      {/* @ts-ignore */}
      <WithNightMode>{children}</WithNightMode>
    </Provider>
  );
}

function WithNightMode({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode {
  const { setColorMode } = useColorMode();
  useEffect(() => {
    const sub = Appearance.addChangeListener((pref) => {
      setColorMode(pref.colorScheme ?? null);
    });
    setColorMode(Appearance.getColorScheme() ?? null);
    return () => sub.remove();
  }, [setColorMode]);
  return children;
}
