"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RefreshCw, Heart, Share2 } from "lucide-react"

// Sample mad libs templates - replace with your own personalized templates
const madLibsTemplates = [
  {
    id: 1,
    title: "Our Perfect Date",
    template:
      "Our perfect date would start with {adjective} {noun} at {place}. We would {verb} together while talking about {plural_noun}. Later, we'd enjoy {food} and {drink} as we watched the {adjective2} {noun2}. At the end of the night, we'd {verb2} under the {adjective3} stars, feeling completely {emotion}.",
    fields: [
      { id: "adjective", label: "Adjective", placeholder: "e.g., beautiful" },
      { id: "noun", label: "Noun", placeholder: "e.g., breakfast" },
      { id: "place", label: "Place", placeholder: "e.g., beachside cafe" },
      { id: "verb", label: "Verb", placeholder: "e.g., dance" },
      { id: "plural_noun", label: "Plural Noun", placeholder: "e.g., dreams" },
      { id: "food", label: "Food", placeholder: "e.g., sushi" },
      { id: "drink", label: "Drink", placeholder: "e.g., champagne" },
      { id: "adjective2", label: "Another Adjective", placeholder: "e.g., magical" },
      { id: "noun2", label: "Another Noun", placeholder: "e.g., sunset" },
      { id: "verb2", label: "Another Verb", placeholder: "e.g., cuddle" },
      { id: "adjective3", label: "One More Adjective", placeholder: "e.g., twinkling" },
      { id: "emotion", label: "Emotion", placeholder: "e.g., content" },
    ],
  },
  {
    id: 2,
    title: "Love Letter from the Future",
    template:
      "My {adjective} {term_of_endearment}, As I sit here in our {adjective2} home in {place}, I can't help but think about our journey together. Remember when we {past_verb} at {event}? Or when we got that {adjective3} {pet} that always {verb}? Through {number} years together, your {body_part} still makes my heart {verb2}. You're still the most {adjective4} person I've ever {past_verb2}. Forever yours, Your {relationship_term}",
    fields: [
      { id: "adjective", label: "Adjective", placeholder: "e.g., wonderful" },
      { id: "term_of_endearment", label: "Term of Endearment", placeholder: "e.g., sweetheart" },
      { id: "adjective2", label: "Another Adjective", placeholder: "e.g., cozy" },
      { id: "place", label: "Place", placeholder: "e.g., Paris" },
      { id: "past_verb", label: "Past Tense Verb", placeholder: "e.g., danced" },
      { id: "event", label: "Event", placeholder: "e.g., our wedding" },
      { id: "adjective3", label: "One More Adjective", placeholder: "e.g., playful" },
      { id: "pet", label: "Pet", placeholder: "e.g., puppy" },
      { id: "verb", label: "Verb", placeholder: "e.g., jumps" },
      { id: "number", label: "Number", placeholder: "e.g., ten" },
      { id: "body_part", label: "Body Part", placeholder: "e.g., smile" },
      { id: "verb2", label: "Another Verb", placeholder: "e.g., flutter" },
      { id: "adjective4", label: "Final Adjective", placeholder: "e.g., amazing" },
      { id: "past_verb2", label: "Past Tense Verb", placeholder: "e.g., met" },
      { id: "relationship_term", label: "Relationship Term", placeholder: "e.g., husband" },
    ],
  },
  {
    id: 3,
    title: "Our Love Story",
    template:
      "Once upon a time, in a {adjective} {place}, there lived a {noun} named {name}. One {day_of_week}, while {verb_ending_in_ing} at the {location}, they met the most {adjective2} person ever. They spent hours talking about {plural_noun} and {verb_ending_in_ing2} together. After {number} dates, they realized they were {adverb} in love. Now they spend their days {verb_ending_in_ing3} and their nights {verb_ending_in_ing4}, creating a love story that's truly {adjective3}.",
    fields: [
      { id: "adjective", label: "Adjective", placeholder: "e.g., charming" },
      { id: "place", label: "Place", placeholder: "e.g., city" },
      { id: "noun", label: "Noun", placeholder: "e.g., artist" },
      { id: "name", label: "Name", placeholder: "e.g., Jamie" },
      { id: "day_of_week", label: "Day of Week", placeholder: "e.g., Tuesday" },
      { id: "verb_ending_in_ing", label: "Verb ending in -ing", placeholder: "e.g., reading" },
      { id: "location", label: "Location", placeholder: "e.g., coffee shop" },
      { id: "adjective2", label: "Another Adjective", placeholder: "e.g., fascinating" },
      { id: "plural_noun", label: "Plural Noun", placeholder: "e.g., dreams" },
      { id: "verb_ending_in_ing2", label: "Another Verb ending in -ing", placeholder: "e.g., laughing" },
      { id: "number", label: "Number", placeholder: "e.g., three" },
      { id: "adverb", label: "Adverb", placeholder: "e.g., deeply" },
      { id: "verb_ending_in_ing3", label: "Third Verb ending in -ing", placeholder: "e.g., exploring" },
      { id: "verb_ending_in_ing4", label: "Fourth Verb ending in -ing", placeholder: "e.g., dreaming" },
      { id: "adjective3", label: "Final Adjective", placeholder: "e.g., magical" },
    ],
  },
]

export default function LoveMadLibs() {
  const [selectedTemplate, setSelectedTemplate] = useState(madLibsTemplates[0])
  const [formValues, setFormValues] = useState({})
  const [generatedStory, setGeneratedStory] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [completedStories, setCompletedStories] = useState([])

  const handleInputChange = (fieldId, value) => {
    setFormValues({
      ...formValues,
      [fieldId]: value,
    })
  }

  const generateStory = () => {
    setIsGenerating(true)

    setTimeout(() => {
      let story = selectedTemplate.template

      // Replace all placeholders with form values
      for (const field of selectedTemplate.fields) {
        const value = formValues[field.id] || field.placeholder.split("e.g., ")[1] || "____"
        story = story.replace(`{${field.id}}`, value)
      }

      setGeneratedStory(story)
      setIsGenerating(false)

      // Add to completed stories
      const newStory = {
        id: Date.now(),
        title: selectedTemplate.title,
        content: story,
      }
      setCompletedStories([newStory, ...completedStories])
    }, 1000)
  }

  const resetForm = () => {
    setFormValues({})
    setGeneratedStory("")
  }

  const selectTemplate = (template) => {
    setSelectedTemplate(template)
    resetForm()
  }

  const shareStory = () => {
    // In a real implementation, this would use the Web Share API
    // or create a shareable link
    alert("In a real implementation, this would share your love story!")
  }

  return (
    <div className="w-full h-full flex flex-col items-center p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-pink-600 mb-4">Love Mad Libs</h2>
        <p className="text-lg text-purple-700">Create fun and romantic stories together</p>
      </motion.div>

      <div className="w-full max-w-4xl">
        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          {madLibsTemplates.map((template) => (
            <Button
              key={template.id}
              variant={selectedTemplate.id === template.id ? "default" : "outline"}
              onClick={() => selectTemplate(template)}
              className={selectedTemplate.id === template.id ? "bg-pink-500 hover:bg-pink-600" : ""}
            >
              {template.title}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-medium text-purple-700 mb-4">{selectedTemplate.title}</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {selectedTemplate.fields.map((field) => (
                <div key={field.id}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                  <Input
                    type="text"
                    value={formValues[field.id] || ""}
                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                    placeholder={field.placeholder}
                    className="w-full"
                  />
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <Button onClick={generateStory} disabled={isGenerating} className="bg-pink-500 hover:bg-pink-600 flex-1">
                {isGenerating ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="mr-2"
                  >
                    <Heart className="h-4 w-4" />
                  </motion.div>
                ) : (
                  <Heart className="mr-2 h-4 w-4" />
                )}
                {isGenerating ? "Creating..." : "Generate Story"}
              </Button>

              <Button onClick={resetForm} variant="outline" className="flex-1">
                <RefreshCw className="mr-2 h-4 w-4" />
                Reset
              </Button>
            </div>
          </div>

          <div>
            <AnimatePresence mode="wait">
              {generatedStory ? (
                <motion.div
                  key="story"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-pink-50 rounded-xl shadow-lg p-6 border border-pink-200"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-medium text-pink-700">{selectedTemplate.title}</h3>
                    <Button variant="ghost" size="sm" onClick={shareStory} className="h-8 w-8 p-0 rounded-full">
                      <Share2 className="h-4 w-4 text-pink-500" />
                    </Button>
                  </div>

                  <div className="bg-white p-4 rounded-lg shadow-inner">
                    <p className="whitespace-pre-line text-gray-700 font-handwriting text-lg">{generatedStory}</p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white rounded-xl shadow-lg p-6 text-center"
                >
                  <Heart className="w-12 h-12 mx-auto text-pink-200 mb-4" />
                  <p className="text-gray-500">Fill in the blanks and generate your story</p>
                  <p className="text-gray-400 text-sm mt-2">Your love story will appear here</p>
                </motion.div>
              )}
            </AnimatePresence>

            {completedStories.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-medium text-purple-700 mb-2">Your Stories</h3>
                <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2">
                  {completedStories.map((story) => (
                    <motion.div
                      key={story.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-white p-3 rounded-lg shadow-sm border-l-4 border-pink-300"
                    >
                      <p className="font-medium text-sm text-pink-700">{story.title}</p>
                      <p className="text-gray-600 text-xs line-clamp-2 mt-1">{story.content}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

