import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import LazySpinner from "@/components/common/LazySpinner";

//Lazy Loading
const LandingPage = lazy(() => import("@/pages/LandingPage"));

const SuspenseWrapper = ({
  children,
  name,
}: {
  children: React.ReactNode;
  name: string;
}) => {
  return <Suspense fallback={<LazySpinner name={name} />}>{children}</Suspense>;
};
export const router = createBrowserRouter([
  //Public
  {
    path: "/",
    element: (
      <SuspenseWrapper name="Landing Page">
        <LandingPage />
      </SuspenseWrapper>
    ),
  },
]);
