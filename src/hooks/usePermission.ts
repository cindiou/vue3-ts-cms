import { useStore } from "@/store";

export default function (urlPrefix: string, feature: string): boolean {
  const store = useStore();
  switch (urlPrefix) {
    case "user":
      urlPrefix = "users";
  }
  const prepVerifyPermission = `system:${urlPrefix}:${feature}`;

  return store.state.login.permissions.includes(prepVerifyPermission);
  /* 
  return !!store.state.login.permissions.find(v=>v===prepVerifyPermission)
  */
}
