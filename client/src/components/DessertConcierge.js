import React, { useState } from "react";
import StepProgress from "../components/StepProgress";
import SelectionCard from "../components/SelectionCard";
import InquiryModal from "../components/InquiryModal";
import RecommendationResult from "../components/RecommendationResult";
import { QUESTIONS, getRecommendation } from "../data/dessertConciergeData";
import "./DessertConcierge.css";

const progressSteps = [
  ...QUESTIONS.map((q, i) => ({ id: i + 1, label: q.title.split(" ").slice(-1)[0] })),
  { id: QUESTIONS.length + 1, label: "Selection" },
];

const DessertConcierge = () => {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({});
  const [recommendation, setRecommendation] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const currentQuestion = QUESTIONS[step - 1];
  const isLastQuestion = step === QUESTIONS.length;

  const handleSelect = (option) => {
    const updatedAnswers = { ...answers, [currentQuestion.id]: option };
    setAnswers(updatedAnswers);

    if (isLastQuestion) {
      const result = getRecommendation(updatedAnswers);
      setRecommendation(result);
      setStep(step + 1);
    } else {
      setStep(step + 1);
    }
  };

  const handleBack = () => setStep((s) => Math.max(s - 1, 1));

  const handleStartAgain = () => {
    setAnswers({});
    setRecommendation(null);
    setStep(1);
  };

  const handleExplore = () => {
    // No dedicated product page wired up yet — route to Click & Collect for now
    window.location.href = "/click-and-collect";
  };

  const showingResult = step > QUESTIONS.length && recommendation;

  return (
    <main className="dessert-concierge">
      <section className="dessert-concierge__hero">
        <span className="dessert-concierge__eyebrow">A Personal Consultation</span>
        <h1 className="dessert-concierge__title">Dessert Concierge</h1>
        <p className="dessert-concierge__subtitle">
          Tell us about your moment. We&rsquo;ll find the perfect creation.
        </p>
      </section>

      <StepProgress steps={progressSteps} currentStep={step} />

      <section className="dessert-concierge__body">
        {!showingResult && currentQuestion && (
          <div className="dessert-concierge__question" key={currentQuestion.id}>
            <h2 className="dessert-concierge__question-title">
              {currentQuestion.title}
            </h2>

            <div className="dessert-concierge__options">
              {currentQuestion.options.map((option) => (
                <SelectionCard
                  key={option.id}
                  title={option.label}
                  color="#f7f5f0"
                  selected={answers[currentQuestion.id]?.id === option.id}
                  onSelect={() => handleSelect(option)}
                />
              ))}
            </div>

            {step > 1 && (
              <button type="button" className="dessert-concierge__back" onClick={handleBack}>
                ← Back
              </button>
            )}
          </div>
        )}

        {showingResult && (
          <RecommendationResult
            recommendation={recommendation}
            onStartAgain={handleStartAgain}
            onExplore={handleExplore}
            onRequest={() => setModalOpen(true)}
          />
        )}
      </section>

      {recommendation && (
        <InquiryModal
          open={modalOpen}
          title="Request Your Curated Selection"
          summaryLines={[
            { label: "Recommended Creation", value: recommendation.name },
            { label: "Suggested Quantity", value: recommendation.quantitySuggestion },
          ]}
          estimatedPrice={recommendation.estimatedPrice}
          onClose={() => setModalOpen(false)}
        />
      )}
    </main>
  );
};

export default DessertConcierge;