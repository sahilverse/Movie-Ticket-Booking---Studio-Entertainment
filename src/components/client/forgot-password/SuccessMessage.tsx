import { Button } from '@/components/ui/button';
import { HomeIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { useCurrentUser } from '@/hooks/useCurrentUser';


const SuccessMessage = () => {
    const { user } = useCurrentUser();

    return (
        <div className="text-center">

            <p className="text-gray-400">You can now log in with your new password.</p>

            <div className="mt-4 flex items-center justify-center">
                {
                    user ?
                        (<Link href="/">
                            <Button className="flex items-center space-x-2 bg-yellowShade hover:bg-yellowShadeHover text-black">
                                <HomeIcon className="h-4 w-4" />
                                <span>Back to Home</span>
                            </Button>
                        </Link>
                        ) :
                        (
                            <Link href="/login">
                                <Button className="flex items-center space-x-2 bg-yellowShade hover:bg-yellowShadeHover text-black">
                                    <span>Back to Login</span>
                                </Button>
                            </Link>
                        )

                }
            </div>
        </div>
    );
};

export default SuccessMessage;
