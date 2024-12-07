import React from 'react';
import { getUser } from "@/lib/actions/influencer.actions";

const Explore = async ({ params }: SearchParamProps) => {
    const { userId } = params; // No need to destructure `await` for params here
    const user = await getUser(userId);

    return (
        <div>
            <h1>User Details</h1>
            {user ? (
                <ul>
                    {Object.entries(user).map(([key, value]) => (
                        <li key={key}>
                            <strong>{key}:</strong> {JSON.stringify(value)}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No user data found.</p>
            )}
        </div>
    );
};

export default Explore;
