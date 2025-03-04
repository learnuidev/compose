import { Button } from "@/src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { useEffect } from "react";
import { useAWSProfileStore } from "../stores/aws-profile.store";
import { useAWSCredentials } from "../ui/hooks/use-aws-credentials";

export function ProfileDropdown() {
  const profile = useAWSProfileStore((state) => state.profile);
  const setProfile = useAWSProfileStore((state) => state.setProfile);
  const credentials = useAWSCredentials();

  useEffect(() => {
    if (!profile) {
      setProfile(credentials?.[0]?.profile);
    }
  }, [profile, setProfile, credentials]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"}>{profile}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {credentials?.map((credential) => {
          return (
            <DropdownMenuItem
              key={credential?.profile}
              onClick={() => {
                setProfile(credential?.profile);
              }}
            >
              {credential?.profile}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
