"use client";

import { useState } from "react";
import {
  Button,
  RadioGroup,
  Radio,
  Label,
  Description,
} from "@heroui/react";

const categories = [
  "Writing",
  "Coding",
  "Marketing",
  "Business",
  "Education",
  "Design",
  "Productivity",
];

const aiTools = [
  "ChatGPT",
  "Claude",
  "Gemini",
  "Midjourney",
  "Copilot",
];

const availableTags = [
  "SEO",
  "Blogging",
  "React",
  "Next.js",
  "JavaScript",
  "Marketing",
  "AI",
  "ChatGPT",
];

export default function CreatePromptPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    category: "",
    aiTool: "",
    tags: [],
    difficulty: "Beginner",
    visibility: "public",
    thumbnail: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      thumbnail: e.target.files?.[0] || null,
    }));
  };

  const handleTagChange = (tag, checked) => {
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tag],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        tags: prev.tags.filter((t) => t !== tag),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const promptData = {
      ...formData,
      copyCount: 0,
      bookmarkCount: 0,
      status: "pending",
      createdAt: new Date(),
    };

    console.log(promptData);

    alert("Prompt Ready To Submit");
  };

  return (
    <div className="mx-auto max-w-5xl p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Add New Prompt
        </h1>

        <p className="mt-2 text-default-500">
          Newly submitted prompts are marked as
          pending and remain hidden until approved
          by an admin.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        {/* Title */}
        <div>
          <label className="mb-2 block font-medium">
            Prompt Title
          </label>

          <input
            type="text"
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter prompt title"
            className="w-full rounded-xl border p-3"
          />
        </div>

        {/* Description */}
        <div>
          <label className="mb-2 block font-medium">
            Prompt Description
          </label>

          <textarea
            name="description"
            rows={4}
            required
            value={formData.description}
            onChange={handleChange}
            placeholder="Short description..."
            className="w-full rounded-xl border p-3"
          />
        </div>

        {/* Content */}
        <div>
          <label className="mb-2 block font-medium">
            Prompt Content
          </label>

          <textarea
            name="content"
            rows={10}
            required
            value={formData.content}
            onChange={handleChange}
            placeholder="Write your AI prompt..."
            className="w-full rounded-xl border p-3"
          />
        </div>

        {/* Category */}
        <div>
          <label className="mb-2 block font-medium">
            Category
          </label>

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full rounded-xl border p-3"
          >
            <option value="">
              Select Category
            </option>

            {categories.map((category) => (
              <option
                key={category}
                value={category}
              >
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* AI Tool */}
        <div>
          <label className="mb-2 block font-medium">
            AI Tool
          </label>

          <select
            name="aiTool"
            value={formData.aiTool}
            onChange={handleChange}
            required
            className="w-full rounded-xl border p-3"
          >
            <option value="">
              Select AI Tool
            </option>

            {aiTools.map((tool) => (
              <option
                key={tool}
                value={tool}
              >
                {tool}
              </option>
            ))}
          </select>
        </div>

        {/* Tags */}
        <div>
          <label className="mb-3 block font-medium">
            Tags
          </label>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {availableTags.map((tag) => (
              <label
                key={tag}
                className="flex items-center gap-2 rounded-lg border p-3 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={formData.tags.includes(
                    tag
                  )}
                  onChange={(e) =>
                    handleTagChange(
                      tag,
                      e.target.checked
                    )
                  }
                />

                <span>{tag}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Difficulty */}
        <RadioGroup defaultValue="beginner" name="difficulty">
          <Label>Difficulty Level</Label>
          <Description>Choose the plan that suits you best</Description>
          <Radio value="beginner">
            <Radio.Content>
              <Radio.Control>
                <Radio.Indicator />
              </Radio.Control>
              Beginner        </Radio.Content>
            <Description>Includes 100 messages per month</Description>
          </Radio>
          <Radio value="intermediate">
            <Radio.Content>
              <Radio.Control>
                <Radio.Indicator />
              </Radio.Control>
              Intermediate        
              </Radio.Content>
            <Description>Includes 200 messages per month</Description>
          </Radio>
          <Radio value="pro">
            <Radio.Content>
              <Radio.Control>
                <Radio.Indicator />
              </Radio.Control>
              pro       
               </Radio.Content>
            <Description>Unlimited messages</Description>
          </Radio>
        </RadioGroup>

        {/* Thumbnail */}
        <div>
          <label className="mb-2 block font-medium">
            Thumbnail Image
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full rounded-xl border p-3"
          />
        </div>

        {/* Visibility */}

        <RadioGroup defaultValue="public" name="visibility">
          <Label>Visibility</Label>
          <Description>Choose the plan that suits you best</Description>
          <Radio value="public">
            <Radio.Content>
              <Radio.Control>
                <Radio.Indicator />
              </Radio.Control>
              Public
            </Radio.Content>
            <Description>Includes 100 messages per month</Description>
          </Radio>
          <Radio value="private">
            <Radio.Content>
              <Radio.Control>
                <Radio.Indicator />
              </Radio.Control>
              Private
            </Radio.Content>
            <Description>Includes 200 messages per month</Description>
          </Radio>
        </RadioGroup>

        {/* Info Box */}
        <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/10 p-4">
          <h3 className="font-semibold">
            Submission Policy
          </h3>

          <p className="mt-2 text-sm text-default-600">
            All newly submitted prompts are
            automatically marked as{" "}
            <strong>pending</strong>. They remain
            hidden from the marketplace until
            reviewed by an admin. Admins can
            approve or reject prompts based on
            platform guidelines.
          </p>
        </div>

        <Button
          type="submit"
          color="primary"
          className="w-full"
        >
          Submit Prompt
        </Button>
      </form>
    </div>
  );
}