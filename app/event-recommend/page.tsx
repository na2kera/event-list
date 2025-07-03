"use client";

import { useSession } from "next-auth/react";
import { useEventRecommend } from "hooks/useEventRecommend";
import { Container } from "components/layout/Container";
import { LoginPromptSection } from "components/recommend/LoginPromptSection";
import { RecommendHeader } from "components/recommend/RecommendHeader";
import { ErrorDisplay } from "components/recommend/ErrorDisplay";
import { LoadingState } from "components/recommend/LoadingState";
import { ResultsSection } from "components/recommend/ResultsSection";
import { EmptyState } from "components/recommend/EmptyState";
import { Header } from "components/layout/Header";

export default function EventRecommendPage() {
  const { data: session } = useSession();
  const { events, isLoading, error, fetchRecommendedEvents } =
    useEventRecommend();

  // ログインチェック
  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <Header />
        <LoginPromptSection />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Header />
      <Container className="flex-grow flex flex-col">
        <div className="py-12 flex-grow flex flex-col justify-center">
          <RecommendHeader onFieldSelect={fetchRecommendedEvents} />

          {error && <ErrorDisplay error={error} />}

          {isLoading && <LoadingState />}

          {!isLoading && events.length > 0 && (
            <ResultsSection events={events} eventsCount={events.length} />
          )}

          {!isLoading && !error && events.length === 0 && <EmptyState />}
        </div>
      </Container>
    </div>
  );
}
