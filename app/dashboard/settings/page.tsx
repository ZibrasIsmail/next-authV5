import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Settings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-6">
          Manage your account settings and preferences here.
        </p>

        {/* Two-Factor Authentication UI */}
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-4">
            Two-Factor Authentication
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                Enable Two-Factor Authentication
              </span>
              <Switch />
            </div>
            <Button>Set Up Two-Factor Authentication</Button>
            <p className="text-sm text-muted-foreground">
              Two-factor authentication adds an extra layer of security to your
              account. Once enabled, you&apos;ll be required to enter a code
              from your authenticator app in addition to your password when
              signing in.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
