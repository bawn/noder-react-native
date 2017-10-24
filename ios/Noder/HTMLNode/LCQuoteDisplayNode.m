//
//  LCQuoteDisplayNode.m
//  Test
//
//  Created by bawn on 28/03/2017.
//  Copyright © 2017 bawn. All rights reserved.
//

#import "LCQuoteDisplayNode.h"
#import "LCPTextNode.h"
#import "UIColor+LCColor.h"
#import "NSMutableAttributedString+LCLineSpace.h"

#import <HTMLKit/HTMLKit.h>

static CGFloat const kMarginValue = 8.0f;
static CGFloat const kHeaderWidth = 4.0f;
static CGFloat const kSpaceValue = 20.0f;

@interface LCQuoteDisplayNode ()

@property (nonatomic, strong) ASTextNode *textNode;
@property (nonatomic, strong) ASDisplayNode *headerNode;

@end

@implementation LCQuoteDisplayNode

- (instancetype)initWithContent:(HTMLNode *)htmlNode delegate:(id<ASTextNodeDelegate>)delegate;{
    self = [super init];
    if (self) {
        ASDisplayNode *headerNode = [[ASDisplayNode alloc] init];
        headerNode.backgroundColor = [UIColor lcQuoteGrayColor];
        [self addSubnode:headerNode];
        self.headerNode = headerNode;
        
        LCPTextNode *textNode = [[LCPTextNode alloc] init];
        textNode.delegate = delegate;
        [self addSubnode:textNode];
        self.textNode = textNode;
        
        NSString *textContent = htmlNode.textContent;
        NSString *lineFeedString = @"\n";
        if ([textContent hasPrefix:lineFeedString]) {
            textContent = [textContent substringFromIndex:lineFeedString.length];
        }
        if ([textContent hasSuffix:lineFeedString]) {
            textContent = [textContent substringToIndex:textContent.length - lineFeedString.length];
        }
        
        NSPredicate *pres = [NSPredicate predicateWithFormat:@"name ==[c] %@", @"a"];
        NSMutableArray *aTagArray = [NSMutableArray array];
        NSMutableArray *hrefArray = [NSMutableArray array];
        [htmlNode enumerateChildNodesUsingBlock:^(HTMLNode * _Nonnull node, NSUInteger idx, BOOL * _Nonnull stop) {
            if (node.hasChildNodes) {
                NSOrderedSet *orderedSet = [node.childNodes filteredOrderedSetUsingPredicate:pres];
                NSArray *contentArray = [orderedSet.array valueForKeyPath:@"textContent"];
                NSArray *valueArray = [orderedSet.array valueForKeyPath:@"attributes.href"];
                [aTagArray addObjectsFromArray:contentArray];
                [hrefArray addObjectsFromArray:valueArray];
            }
        }];
        
        
        textNode.attributedText = [NSMutableAttributedString attributedWithPString:textContent
                                                                  aStringArray:aTagArray.copy
                                                                     hrefArray:hrefArray.copy];
        
    }
    return self;
}

- (void)layoutDidFinish{
    [super layoutDidFinish];
    self.headerNode.frame = CGRectMake(0, 0, kHeaderWidth, self.bounds.size.height - kSpaceValue);
}

- (ASLayoutSpec *)layoutSpecThatFits:(ASSizeRange)constrainedSize{
    UIEdgeInsets inset = UIEdgeInsetsMake(kMarginValue, kSpaceValue + kHeaderWidth, kMarginValue + kSpaceValue, 0.0f);
    ASInsetLayoutSpec *insetLayout = [ASInsetLayoutSpec insetLayoutSpecWithInsets:inset child:self.textNode];
    return insetLayout;
}

@end
