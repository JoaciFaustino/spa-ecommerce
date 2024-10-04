import { useEffect, useRef, useState } from "react";

export const useInfiniteScroll = (
  callback: (() => void | Promise<void>) | undefined,
  rootMargin?: string,
  isDisabled: boolean = false
) => {
  const finalPageInspectorRef = useRef<HTMLElement | null>(null);
  const [canLoadMore, setCanLoadMore] = useState(false);
  const [observer, setObserver] = useState<IntersectionObserver | null>(null);
  const finalPageInspectorCurrent = finalPageInspectorRef.current;

  useEffect(() => {
    setObserver(
      new IntersectionObserver(
        ([finalPageInspector]) => {
          if (finalPageInspector.isIntersecting) {
            setCanLoadMore(true);
          }
        },
        { rootMargin }
      )
    );

    return () => disconectObserver();
  }, []);

  useEffect(() => {
    if (isDisabled) {
      disconectObserver();
      return;
    }

    conectObserver();
  }, [observer, finalPageInspectorCurrent, isDisabled]);

  useEffect(() => {
    const handleAsync = async () => {
      if (!canLoadMore || isDisabled || !callback) {
        return;
      }

      await callback();
      setCanLoadMore(false);
    };

    handleAsync();
  }, [canLoadMore]);

  const conectObserver = () => {
    if (observer && finalPageInspectorRef.current) {
      observer.observe(finalPageInspectorRef.current);
    }
  };

  const disconectObserver = () => {
    if (observer) {
      observer.disconnect();
    }
  };

  return { finalPageInspectorRef };
};
